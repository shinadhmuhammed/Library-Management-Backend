import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String }
});



const AdminUser = mongoose.model('AdminUser', adminUserSchema);

export default AdminUser;
