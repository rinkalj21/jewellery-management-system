// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For token generation
const dotenv = require('dotenv');
const Product = require('./Product'); 
const User = require('./User'); // Import User model
const multer = require('multer');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads folder

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set destination to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  },
});
const upload = multer({ storage });


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log('DB Connection Error:', err));

// User Model
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
//const User = mongoose.model('User', UserSchema);

// Test API endpoint
app.get('/test', async (req, res) => {
  res.status(200).json({ "msgsend": "successful" });
});

// Register Route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    //const hashedPassword = await bcrypt.hash(password, 10);
    //const newUser = new User({ email, password: hashedPassword });
    console.log("password change"+password)
    const newUser = new User({ email, password: password });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error registering user', error: error.message });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
console.log("login start");
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'user does not exist' });
    }
    console.log("login after db");
    console.log("log in"+password+" dbpassword:"+user.password);
    if (password == user.password) {
      console.log("password match");
    } else {
      console.log("password does not match");
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    // Check if the password matches
    /*const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }*/

    // Generate a token (optional)//
    //const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const token="123";
    console.log("login token generated");
    res.json({ success: true, message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error during login', error: error.message });
  }
});

// Get all products
app.get('/jewellery', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products', error: error.message });
  }
});

// Create a new product
app.post('/create', upload.single('image'), async (req, res) => {
  const { name, category, price, description } = req.body;
  const image = req.file.path;

  try {
    const newProduct = new Product({ name, category, price, description, image });
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating product', error: error.message });
  }
});

// Update product
app.put('/update/:id', upload.single('image'), async (req, res) => {
  const { name, category, price, description } = req.body;
  const image = req.file ? req.file.path : req.body.image;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { name, category, price, description, image }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating product', error: error.message });
  }
});

// Delete product
app.delete('/delete/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting product', error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
