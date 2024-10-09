const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const borrowRoutes = require('./routes/borrow');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrows', borrowRoutes);

app.get('/',(req,res) =>{
    return res.json({server : "running"})
})

const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://pritamrao37:pritamrao37@cluster0.7f1pqc4.mongodb.net/Library?retryWrites=true&w=majority&appName=Cluster0").then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.log('Database connection error:', error);
});
