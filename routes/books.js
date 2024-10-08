const express = require('express');
const { getBooks, addBook, updateBook, deleteBook, getBook, getBySearch } = require('../controllers/bookController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getBooks);
router.get('/:id', auth, getBook);
router.post('/', auth, addBook);
router.put('/:id', auth, updateBook);
router.get('/search/:name', getBySearch)
router.delete('/:id', auth, deleteBook);

module.exports = router;