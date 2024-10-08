const express = require('express');
const { signup, login, getUser, getAll, deleteUser, updateUser, getUserById, deleteUserAdmin } = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/getUser/:id', getUser)
router.get('/getAll',auth,getAll)
router.delete('/:id',auth,deleteUser)
router.delete('/admin/:id',auth,deleteUserAdmin)
router.put('/:id',auth,updateUser)

module.exports = router;
