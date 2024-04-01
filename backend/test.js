const WebSocket = require('ws');
const axios = require('axios');

const binanceWS = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
const serverWebhookUrl = 'https://fwn7jrfx-3001.inc1.devtunnels.ms/webhook';

binanceWS.on('message', async function incoming(data) {
    // Convert Buffer to string, then parse JSON
    const parsedData = JSON.parse(data.toString());
    console.log(parsedData);
    
    // Forward the parsed data to your server using axios
    try {
      const response = await axios.post(serverWebhookUrl, parsedData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error forwarding message:', error);
    }
  });
  