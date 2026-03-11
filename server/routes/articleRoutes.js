import express from 'express';
import { getArticles, createArticle, updateArticle, deleteArticle } from '../controllers/articleController.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getArticles);
router.post('/', verifyToken, requireAdmin, createArticle);
router.put('/:id', verifyToken, requireAdmin, updateArticle);
router.delete('/:id', verifyToken, requireAdmin, deleteArticle);

export default router;
