const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

class ComplaintService {
  static async fileComplaint(uid, complaintData) {
    const docRef = db.collection('complaints').doc();
    const payload = {
      ...complaintData,
      filedBy: uid,
      status: 'OPEN',
      createdAt: new Date()
    };
    await docRef.set(payload);
    return { id: docRef.id, ...payload };
  }

  static async getUserComplaints(uid) {
    // Single where() to avoid composite index requirement
    const snapshot = await db.collection('complaints')
      .where('filedBy', '==', uid)
      .get();
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // Sort in memory
    return docs.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
  }
}
module.exports = ComplaintService;
