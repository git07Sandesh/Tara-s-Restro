import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Admin from '../models/admin.model.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const hashed = await bcrypt.hash(password, 10);
    await Admin.create({ username, password: hashed });
    console.log('Admin created');
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();