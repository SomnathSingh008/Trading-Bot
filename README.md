# Trading Bot

This project is a simple trading bot simulation for a hypothetical stock market using Node.js.

## Features:

- Buys stock when the price drops by 2%.
- Sells stock when the price rises by 3%.
- Tracks profit and loss, and logs trades into a database.

## How to Run:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/trading-bot.git
   cd trading-bot
   ```

2. Start the mock stock price API:
   node mock-api.js

3. Run the trading bot:
   node trading-bot.js

## Project Overview

The trading bot will:

Monitor stock prices using mock data from an API.
Execute trades based on a simple strategy (e.g., moving average crossover or price percentage changes).
Track the performance of trades (profit, loss, positions).

## Tools and Libraries:

Node.js for backend.
Express.js for the API.
Axios for making HTTP requests to the mock API.
SQLite or PostgreSQL for storing trade and performance data (or in-memory for simplicity).
