const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
  const books = await Book.find({});
  res.json(books);
};

exports.getBook = async (req, res) => {
  const { id } = req.params;
  console.log("Book id",id);
  if (id == null) {
    return res.status(400).json({ message: 'Book not found' });
  }
  const book = await Book.findById(id);
  res.json(book);
};

exports.addBook = async (req, res) => {
  var { title, author, coverURL, description } = req.body;
  coverURL = coverURL === ""? "https://media.istockphoto.com/id/157482029/photo/stack-of-books.jpg?s=612x612&w=0&k=20&c=ZxSsWKNcVpEzrJ3_kxAUuhBCT3P_dfnmJ81JegPD8eE=" : coverURL;
  const newBook = new Book({ title, author, coverURL, description });
  await newBook.save();
  res.status(201).json({ message: 'Book added successfully' });
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, coverURL, description } = req.body;
  const book = await Book.findByIdAndUpdate(id, { title, author, coverURL, description }, { new: true });
  res.json(book);
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.json({ message: 'Book deleted successfully' });
};

exports.getBySearch = async(req,res) => {
  const { name } = req.params;
  const books = await Book.find({
    $or: [
      { title: { $regex: name, $options: 'i' } },
      { author: { $regex: name, $options: 'i' } }
    ]
  });
  res.json(books);
}
