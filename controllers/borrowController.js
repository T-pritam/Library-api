const BorrowRecord = require('../models/BorrowRecord');
const Book = require('../models/Book');
const User = require('../models/User');

exports.borrowBook = async (req, res) => {
  const { bookId, memberId } = req.body;

  const user = await User.findById(memberId);

  const book = await Book.findById(bookId);
  if (!book || !book.available) {
    return res.status(400).json({ message: 'Book not available' });
  }

  const borrowRecord = new BorrowRecord({ bookId, memberId });
  await borrowRecord.save();

  book.available = false;
  book.borrowedBy = user.username;
  book.borrowedById = user._id
  await book.save();

  res.json({ message: 'Book borrowed successfully' });
};

exports.returnBook = async (req, res) => {
  const { bookId } = req.body;
  const memberId = req.user.id;

  const borrowRecord = await BorrowRecord.findOne({ bookId, memberId, returnedAt: null });
  if (!borrowRecord) {
    return res.status(400).json({ message: 'Borrow record not found' });
  }

  borrowRecord.returnedAt = new Date();
  await borrowRecord.save();

  const book = await Book.findById(bookId);
  book.available = true;
  book.borrowedBy = "";
  book.borrowedById = "";
  await book.save();

  res.json({ message: 'Book returned successfully' });
};

exports.getByUserId = async (req, res) => {
  const { id } = req.params;
  console.log("getByUserId",id)
  const borrowRecords = await BorrowRecord.find({ memberId: id }).populate('bookId').sort({ borrowedAt: -1 });
  console.log(borrowRecords)
  res.json(borrowRecords);
}
