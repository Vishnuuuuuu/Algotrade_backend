const WebSocket = require('ws');
const fetch = require('node-fetch');

const binanceWS = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
const serverWebhookUrl = 'https://fwn7jrfx-3001.inc1.devtunnels.ms/webhook';

binanceWS.on('message', function incoming(data) {
  console.log(data);
  // Forward the message to your server
  fetch(serverWebhookUrl, {
    method: 'POST',
    body: data,
    headers: { 'Content-Type': 'application/json' },
  })
  .then(response => console.log(response))
  .catch(error => console.error('Error forwarding message:', error));
});
