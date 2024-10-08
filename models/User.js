const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  role: {
    type: String,
    enum: ['LIBRARIAN', 'MEMBER'],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
