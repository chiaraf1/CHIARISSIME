/**
 * Run once to create the first admin user:
 *   node server/scripts/createAdmin.js
 *
 * Set these env vars first (or add to .env):
 *   MONGO_URI, ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD
 */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';

dotenv.config({ path: new URL('../../.env', import.meta.url) });

const { MONGODB_URI, ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Missing MONGODB_URI, ADMIN_EMAIL, or ADMIN_PASSWORD in .env');
  process.exit(1);
}

await mongoose.connect(MONGODB_URI);

const existing = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });

if (existing) {
  existing.isAdmin = true;
  await existing.save();
  console.log(`✓ ${ADMIN_EMAIL} already exists — promoted to admin.`);
} else {
  await User.create({
    name: ADMIN_NAME || 'Admin',
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    isAdmin: true,
  });
  console.log(`✓ Admin user created: ${ADMIN_EMAIL}`);
}

await mongoose.disconnect();
