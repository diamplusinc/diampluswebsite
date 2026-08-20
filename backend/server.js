const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const app = express();

// 1. Updated CORS Configuration for Live Domains
const allowedOrigins = [
  'https://diamplusinc.com',
  'https://www.diamplusinc.com',
  'https://diamplus-frontend.onrender.com',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Fallback allow during testing
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let diamondData = [];
const csvFilePath = path.join(__dirname, 'diamonds.csv');
const usersFilePath = path.join(__dirname, 'users.json');

// Helper to read users
const getUsers = () => {
  if (!fs.existsSync(usersFilePath)) {
    try {
      fs.writeFileSync(usersFilePath, JSON.stringify([]));
    } catch (e) {
      console.error('Error creating users.json:', e);
    }
    return [];
  }
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
};

// Helper to save users
const saveUsers = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (e) {
    console.error('Error saving users:', e);
  }
};

// Read CSV File on Startup
if (fs.existsSync(csvFilePath)) {
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => diamondData.push(data))
    .on('end', () => {
      console.log(`CSV Loaded Successfully. Total records: ${diamondData.length}`);
    })
    .on('error', (err) => {
      console.error('Error reading CSV file:', err.message);
    });
} else {
  console.error('CRITICAL: diamonds.csv file was not found in the root directory!');
}

// --- API ROUTES ---

// Protected Inventory Route
app.get('/api/diamonds', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized. Please log in first.' });
  }

  res.json(diamondData);
});

// Signup Route
app.post('/api/signup', (req, res) => {
  const { name, email, company, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const users = getUsers();
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (existingUser) {
    return res.status(400).json({ message: 'An account with this email already exists.' });
  }

  const newUser = { id: Date.now(), name, email, company, password };
  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: 'Account created successfully!' });
});

// Login Route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter email and password.' });
  }

  const users = getUsers();
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  res.json({
    message: 'Login successful!',
    token: `token_${user.id}`,
    user: { name: user.name, email: user.email, company: user.company }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));