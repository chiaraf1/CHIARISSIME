import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  byline: { type: String, default: '' },
  excerpt: { type: String, required: true },
  body: [{ type: String }],
  image: { type: String, default: '' },
  imageCaption: { type: String, default: '' },
  tag: { type: String, default: '' },
  section: { type: String, default: '' },
  page: { type: String, required: true, enum: ['editorials', 'runway', 'culture'] },
  category: { type: String, default: '' },
  date: { type: String, default: '' },
  season: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Article', articleSchema);
