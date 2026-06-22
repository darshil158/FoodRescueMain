const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

class DonationService {
  static async createDonation(restaurantId, donationData) {
    const docRef = db.collection('donations').doc();
    const payload = {
      ...donationData,
      restaurantId,
      status: 'AVAILABLE',
      ngoId: null,
      volunteerId: null,
      createdAt: new Date(),
      timestamps: { createdAt: new Date() }
    };
    await docRef.set(payload);
    return { id: docRef.id, ...payload };
  }

  static async getDonationById(donationId) {
    const doc = await db.collection('donations').doc(donationId).get();
    if (!doc.exists) throw new Error('Donation not found');
    return { id: doc.id, ...doc.data() };
  }

  static async getActiveDonations(filters = {}) {
    let query = db.collection('donations');

    // Apply single filter to avoid composite index requirement
    if (filters.restaurantId) {
      query = query.where('restaurantId', '==', filters.restaurantId);
    } else if (filters.ngoId) {
      query = query.where('ngoId', '==', filters.ngoId);
    } else if (filters.status) {
      query = query.where('status', '==', filters.status);
    }

    const snapshot = await query.get();
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Sort in memory to avoid Firestore composite index requirement
    return docs.sort((a, b) => {
      const aTime = a.createdAt?.seconds || 0;
      const bTime = b.createdAt?.seconds || 0;
      return bTime - aTime;
    });
  }

  static async claimDonation(donationId, ngoId) {
    const docRef = db.collection('donations').doc(donationId);
    const doc = await docRef.get();

    if (!doc.exists) throw new Error('Donation not found');
    if (doc.data().status !== 'AVAILABLE') throw new Error('Donation is no longer available');

    await docRef.update({
      status: 'CLAIMED',
      ngoId,
      'timestamps.claimedAt': new Date()
    });

    return { success: true, status: 'CLAIMED' };
  }

  static async cancelDonation(donationId, restaurantId) {
    const docRef = db.collection('donations').doc(donationId);
    const doc = await docRef.get();

    if (!doc.exists) throw new Error('Donation not found');
    if (doc.data().restaurantId !== restaurantId) throw new Error('Unauthorized');
    if (doc.data().status !== 'AVAILABLE') throw new Error('Can only cancel unassigned donations');

    await docRef.update({
      status: 'CANCELLED',
      'timestamps.cancelledAt': new Date()
    });

    return { success: true };
  }
}
module.exports = DonationService;
