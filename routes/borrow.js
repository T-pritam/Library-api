const express = require('express');
const { borrowBook, returnBook, getByUserId } = require('../controllers/borrowController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/borrow', auth, borrowBook);
router.post('/return', auth, returnBook);
router.get('/getByUserId/:id',auth, getByUserId)

module.exports = router;
