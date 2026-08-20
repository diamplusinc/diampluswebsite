const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const app = express();

// Required Middlewares
app.use(cors());
app.use(express.json()); // Parses incoming JSON from Axios requests
app.use(express.urlencoded({ extended: true }));

let diamondData = [];
const csvFilePath = path.join(__dirname, 'diamonds.csv');
const usersFilePath = path.join(__dirname, 'users.json');

// Helper to read users from users.json file
const getUsers = () => {
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([]));
    return [];
  }
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
};

// Helper to save users to users.json file
const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Read CSV File on Startup
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (data) => diamondData.push(data))
  .on('end', () => {
    console.log(`CSV Loaded Successfully. Total records: ${diamondData.length}`);
  })
  .on('error', (err) => {
    console.error('Error reading CSV file:', err.message);
  });

// --- API ROUTES ---

// Get Inventory
app.get('/api/diamonds', (req, res) => {
  res.json(diamondData);
});

// Signup Route
app.post('/api/signup', (req, res) => {
  const { name, email, company, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const users = getUsers();

  // Check if email already exists
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ message: 'An account with this email already exists.' });
  }

  // Create and save new user
  const newUser = { id: Date.now(), name, email, company, password };
  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: 'Account created successfully!' });
});
// Protected API Endpoint
app.get('/api/diamonds', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized. Please log in first.' });
  }

  res.json(diamondData);
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