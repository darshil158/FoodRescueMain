const { db } = require('../../config/firebase');

exports.submitContactForm = async (req, res, next) => {
  try {
    const { fullName, email, category, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const ticket = {
      fullName,
      email,
      category: category || 'Other',
      message,
      status: 'open',
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection('support_tickets').add(ticket);

    res.status(201).json({
      success: true,
      message: 'Support ticket submitted successfully',
      ticketId: docRef.id
    });
  } catch (error) {
    next(error);
  }
};
