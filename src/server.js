// server.js → hanya mendefinisikan server: routes, middleware, data
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory "database"
let products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Mouse', price: 25 }
];
let nextId = 3;

// Routes
app.get('/healthz', (req, res) => res.status(200).json({ status: 'ok' }));

app.get('/products', (req, res) => res.json(products));

app.post('/api/products', (req, res) => {
  const { name, price } = req.body || {};
  if (!name || !price) return res.status(400).json({ error: 'name and price required' });
  const product = { id: nextId++, name, price };
  products.push(product);
  res.status(201).json(product);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ❌ Tidak ada app.listen di sini
module.exports = app;

