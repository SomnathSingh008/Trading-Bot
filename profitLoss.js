const generateReport = () => {
  console.log('--- Trading Summary ---');
  db.all("SELECT * FROM trades", [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(`${row.timestamp}: ${row.action} ${row.shares} shares at $${row.price}`);
    });
    console.log(`Final Balance: $${balance.toFixed(2)}`);
    console.log(`Total Profit: $${totalProfit.toFixed(2)}`);
  });
};

// Graceful shutdown to print summary report
process.on('SIGINT', () => {
  generateReport();
  db.close();
  process.exit();
});
