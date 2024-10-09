const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
  const { username, password, role } = req.body;
  console.log(username, password, role);

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

exports.getUser = async (req, res) => {
  console.log("req")
  console.log(req.params)
  const { id } = req.params;
  const user = await User.findById(id).select('-password').lean();
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.status(200).json({ username: user.username, role: user.role });
};

exports.login = async (req, res) => { 
  const { username, password } = req.body;
  const user1 = await User.findOne({ username });

  try {

    const user = await User.findOne({ username });
    if (!user || !user.isActive) return res.status(400).json({ message: 'Invalid username or password' });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    const isAdmin = user.role === 'LIBRARIAN';
    if (!isPasswordCorrect) {return res.status(400).json({ message: 'Invalid username or password' });}
    else{
    const token = jwt.sign({ id: user._id, role: user.role }, "secretpassword", { expiresIn: '1d' });
    res.status(200).json({ token: token, id: user._id ,isAdmin: isAdmin });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

exports.getAll = async (req, res) => {
  const users = await User.find({ role: "MEMBER"}).select('-password');
  res.status(200).json(users);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { isActive: false });
  if (!user) return res.status(404).json({ message: 'User not found' });
  await user.save();
  res.status(200).json({ message: 'User deleted successfully' });
};

exports.deleteUserAdmin = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.status(200).json({ message: 'User deleted successfully' });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  var { username, role, password, isActive } = req.body;
  if (password){
    password = await bcrypt.hash(password, 10);
  }
  const user = await User.findByIdAndUpdate(id, { username, role, password, isActive }, { new: true });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.status(200).json({ message: 'User updated successfully' });
}
