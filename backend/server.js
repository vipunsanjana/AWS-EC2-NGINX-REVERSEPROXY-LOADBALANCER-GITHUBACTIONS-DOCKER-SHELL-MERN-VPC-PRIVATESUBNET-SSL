const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Mock database (replace with real DB in production)
const products = [
  { id: 1, name: "Product A" },
  { id: 2, name: "Product B" }
];

app.use(cors());
app.use(express.json());

// API endpoint
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});



