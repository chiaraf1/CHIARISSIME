import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';

dotenv.config();

const email = process.argv[2];

if (!email) {
  console.error('Usage: node makeAdmin.js <email>');
  process.exit(1);
}

await mongoose.connect(process.env.MONGODB_URI);

const user = await User.findOneAndUpdate(
  { email: email.toLowerCase() },
  { isAdmin: true },
  { new: true }
);

if (!user) {
  console.error(`No user found with email: ${email}`);
} else {
  console.log(`✓ ${user.email} is now an admin`);
}

await mongoose.disconnect();
