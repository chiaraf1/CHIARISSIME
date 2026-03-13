import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/Authroutes.js';
import articleRoutes from './routes/articleRoutes.js';
import bookmarkRoutes from './routes/bookmarkRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import { verifyToken, requireAdmin } from './middleware/auth.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Image upload (saves to client/public/images/uploads/)
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../client/public/images/uploads'),
  filename: (_req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

app.post('/api/upload', verifyToken, requireAdmin, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({ path: `/images/uploads/${req.file.filename}` });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Test-only: seed an admin user (requires CYPRESS_SECRET env var to be active)
if (process.env.CYPRESS_SECRET) {
  app.post('/api/auth/seed-admin', async (req, res) => {
    if (req.body.secret !== process.env.CYPRESS_SECRET) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const { name, email, password } = req.body;
    try {
      const { default: User } = await import('./models/User.js');
      let user = await User.findOne({ email });
      if (user) {
        user.isAdmin = true;
        await user.save();
      } else {
        user = await User.create({ name, email, password, isAdmin: true });
      }
      res.json({ message: 'Admin ready' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
}

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ message: 'Server is running' });
});

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
