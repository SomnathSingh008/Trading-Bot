const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();

// Trading constants
const BUY_THRESHOLD = -2; // Buy when price drops 2%
const SELL_THRESHOLD = 3; // Sell when price rises 3%
const TRADE_INTERVAL = 5000; // Check every 5 seconds
let lastPrice = null;
let position = 0; // 1 means bought, 0 means no position
let balance = 10000; // Starting balance in dollars
let shares = 0;
let totalProfit = 0;

// Set up SQLite DB
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE trades (id INTEGER PRIMARY KEY, action TEXT, price REAL, shares INTEGER, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");
});

// Helper function to log trades
const logTrade = (action, price, shares) => {
  db.run("INSERT INTO trades (action, price, shares) VALUES (?, ?, ?)", [action, price, shares], (err) => {
    if (err) {
      console.error('Error logging trade:', err);
    }
  });
};

// Function to simulate trading strategy
const tradeLogic = async () => {
  try {
    const response = await axios.get('http://localhost:3001/stock-price', { timeout: 5000 });
    const currentPrice = parseFloat(response.data.price);
    console.log('Stock price:', currentPrice);

    if (lastPrice !== null) {
      const priceChange = ((currentPrice - lastPrice) / lastPrice) * 100;

      // Buy logic
      if (priceChange <= BUY_THRESHOLD && position === 0) {
        shares = Math.floor(balance / currentPrice);
        balance -= shares * currentPrice;
        position = 1;
        console.log(`Bought ${shares} shares at $${currentPrice}`);
        logTrade('BUY', currentPrice, shares);
      }

      // Sell logic
      if (priceChange >= SELL_THRESHOLD && position === 1) {
        balance += shares * currentPrice;
        totalProfit += (shares * currentPrice) - (shares * lastPrice);
        console.log(`Sold ${shares} shares at $${currentPrice}. Total Profit: $${totalProfit.toFixed(2)}`);
        logTrade('SELL', currentPrice, shares);
        position = 0;
        shares = 0;
      }
    }

    lastPrice = currentPrice;
  } catch (error) {
    if (error.response) {
      console.error('Server responded with an error:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
  }
};

// Set an interval to check stock prices and run trading logic
setInterval(tradeLogic, TRADE_INTERVAL);
