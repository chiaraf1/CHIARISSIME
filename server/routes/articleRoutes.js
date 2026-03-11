import express from 'express';
import { getArticles, getArticle, createArticle, updateArticle, deleteArticle } from '../controllers/articleController.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getArticles);
router.get('/:id', getArticle);
router.post('/', verifyToken, requireAdmin, createArticle);
router.put('/:id', verifyToken, requireAdmin, updateArticle);
router.delete('/:id', verifyToken, requireAdmin, deleteArticle);

export default router;
