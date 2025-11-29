// server.js (Ваш Мост/Сервер)

const WebSocket = require('ws');

// Запуск моста на порту 8080 (адрес, по которому будет подключаться ваш сайт)
const wss = new WebSocket.Server({ port: 8080 }); 
const clients = new Set(); 

// Когда кто-то подключается к мосту (к WebSocket)
wss.on('connection', function connection(ws) {
  clients.add(ws); 
  console.log('Новый пользователь подключился к Мосту.');

  // Когда от пользователя приходит сообщение
  ws.on('message', function incoming(message) {
    const messageText = message.toString();

    // Пересылаем сообщение ВСЕМ, кто подключен (кроме отправителя)
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(messageText);
      }
    });
  });

  // Когда пользователь закрыл вкладку
  ws.on('close', function() {
    clients.delete(ws);
    console.log('Пользователь отключился от Моста.');
  });
});

console.log('Мост (WebSocket Server) запущен на порту 8080');
