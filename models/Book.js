const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverURL: { type: String , default:"https://media.istockphoto.com/id/157482029/photo/stack-of-books.jpg?s=612x612&w=0&k=20&c=ZxSsWKNcVpEzrJ3_kxAUuhBCT3P_dfnmJ81JegPD8eE="},
  description: { type: String },
  available: { type: Boolean, default: true },
  borrowedBy: { type: String },
  borrowedById: { type: String },

}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
