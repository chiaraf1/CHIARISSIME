import express from 'express';
import Subscriber from '../models/Subscriber.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required.' });

  try {
    await Subscriber.create({ email });
    res.json({ message: 'Subscribed successfully.' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Already subscribed.' });
    }
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

export default router;
