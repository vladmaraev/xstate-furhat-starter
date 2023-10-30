const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

// Set up the proxy to forward requests to your backend app
app.use('/api', proxy('http://localhost:3001')); // Point to your backend's URL

// Start the proxy server on a different port (e.g., 3000)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
