const express = require('express');
const app = express();

// Simulate stock price data
app.get('/stock-price', (req, res) => {
  const stockPrice = { price: (100 + Math.random() * 10).toFixed(2) }; // Random stock price
  res.json(stockPrice);
});

app.listen(3001, () => {
  console.log('Stock price server is running on port 3001');
});
