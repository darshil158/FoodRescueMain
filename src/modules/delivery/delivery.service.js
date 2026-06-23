const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

class DeliveryService {
  static async getAvailableDeliveries() {
    const snapshot = await db.collection('donations')
      .where('status', '==', 'CLAIMED')
      .where('volunteerId', '==', null)
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async acceptDelivery(donationId, volunteerId) {
    const ref = db.collection('donations').doc(donationId);
    const doc = await ref.get();
    if (!doc.exists) throw new Error('Donation not found');
    if (doc.data().status !== 'CLAIMED') throw new Error('Donation not claimable for delivery');
    if (doc.data().volunteerId) throw new Error('Already assigned to a volunteer');
    await ref.update({ volunteerId, status: 'IN_TRANSIT', 'timestamps.acceptedAt': new Date() });
    return { success: true };
  }

  static async updateDeliveryStatus(donationId, volunteerId, newStatus) {
    const ref = db.collection('donations').doc(donationId);
    const doc = await ref.get();
    if (!doc.exists) throw new Error('Donation not found');
    if (doc.data().volunteerId !== volunteerId) throw new Error('Unauthorized');
    const validStatuses = ['PICKED_UP', 'EN_ROUTE', 'DELIVERED'];
    if (!validStatuses.includes(newStatus)) throw new Error(`Invalid status. Must be: ${validStatuses.join(', ')}`);
    
    const updateData = { status: newStatus };
    if (newStatus === 'DELIVERED') updateData['timestamps.completedAt'] = new Date();
    await ref.update(updateData);

    // Send Donation Completed Email
    if (newStatus === 'DELIVERED') {
      try {
        const donationData = doc.data();
        const donorRef = db.collection('users').doc(donationData.donorId);
        const donorDoc = await donorRef.get();
        if (donorDoc.exists) {
          const EmailService = require('../email/email.service');
          const userData = donorDoc.data();
          const quantity = parseInt(donationData.quantity) || 0;
          // Simple heuristic for impact if not specifically stored:
          const mealsServed = Math.floor(quantity * 2.5); // assuming 1 kg ~ 2.5 meals
          const familiesHelped = Math.max(1, Math.floor(mealsServed / 4));
          const co2Saved = (quantity * 2.5).toFixed(1); // approx 2.5 kg CO2 per kg food
          await EmailService.sendDonationCompleted(
            userData.email, 
            userData.email.split('@')[0], 
            mealsServed, 
            familiesHelped, 
            co2Saved
          );
        }
      } catch (err) {
        console.warn('Failed to send donation completed email:', err.message);
      }
    }

    return { success: true, status: newStatus };
  }
}
module.exports = DeliveryService;
