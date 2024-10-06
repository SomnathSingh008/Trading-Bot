const axios = require('axios');

async function tradeLogic() {
    try {
        const response = await axios.get('http://localhost:3001/stock-price', { timeout: 10000 });

        const data = response.data; // Ensure that 'data' is defined here
        console.log('Stock Price:', data);
        // Proceed with your trading logic using 'data'
    } catch (error) {
        console.error('Error fetching stock price:', error.message);
        if (error.response) {
            console.error('Response:', error.response.data);
        } else {
            console.error('No response received');
        }
    }
}

// Example of using setInterval or setTimeout
setInterval(tradeLogic, 10000); // Adjust interval as needed
