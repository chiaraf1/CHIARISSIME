import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import User from '../models/User.js';
import Article from '../models/Article.js';

const router = express.Router();

// GET /api/bookmarks — return user's bookmarked articles
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('bookmarks');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.bookmarks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/bookmarks/:articleId — toggle bookmark on/off
router.post('/:articleId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const articleExists = await Article.exists({ _id: req.params.articleId });
    if (!articleExists) return res.status(404).json({ message: 'Article not found' });

    const alreadyBookmarked = user.bookmarks.some(
      (id) => id.toString() === req.params.articleId
    );

    if (alreadyBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== req.params.articleId
      );
    } else {
      user.bookmarks.push(req.params.articleId);
    }

    await user.save();
    res.json({ bookmarked: !alreadyBookmarked, bookmarks: user.bookmarks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
