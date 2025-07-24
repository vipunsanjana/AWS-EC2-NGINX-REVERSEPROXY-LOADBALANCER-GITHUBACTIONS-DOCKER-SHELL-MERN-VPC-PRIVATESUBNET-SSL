const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

let products = [
  { id: 1, name: "Product A" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 4, name: "Product D" },
  { id: 5, name: "Product E" }
];

app.use(cors());
app.use(express.json());

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Add a new product
app.post('/api/products', (req, res) => {
  const newProduct = { id: Date.now(), name: req.body.name };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.status(204).send();
});

// Deployment info
app.get('/api/info', (req, res) => {
  res.json({
    project: "MERN Deployment",
    developer: "Vipun Sanjana",
    stack: [
      "AWS EC2",
      "NGINX Reverse Proxy",
      "Docker & Docker Hub",
      "GitHub Actions (CI/CD)",
      "Shell Scripting",
      "MERN Stack",
      "VPC with Private Subnet",
      "Load Balancer",
      "SSL & HTTPS",
      "Cloud Security (IAM, SGs)"
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
