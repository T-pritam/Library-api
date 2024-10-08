const mongoose = require('mongoose');

const borrowRecordSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  borrowedAt: { type: Date, default: Date.now },
  returnedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('BorrowRecord', borrowRecordSchema);
