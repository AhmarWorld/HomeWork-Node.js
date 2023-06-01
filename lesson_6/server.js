require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');
const { WebSocketServer } = require('ws');

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

const server = http.createServer(app);
const wss = new WebSocketServer({ clientTracking: false, noServer: true });

app.get('/', (req, res) => res.end('aa'))

server.on('upgrade', (request, socket, head) => {
  console.log('Parsing session from request...');

    console.log('Session is parsed!');

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  
});

const maxClients = 2;
const rooms = new Map();

wss.on('connection', (ws, request) => {
    console.log('Подключен')
    const connectId = uuidv4()
    ws.connectId = connectId
    rooms.set(connectId, ws)

  ws.on('message', (message) => {
    const obj = JSON.parse(message);
    console.log(obj);
    const { type } = obj;
    console.log(obj);

    if(type === `new_message`){
      rooms.forEach(w=> w.send({type:`new_message`,data:{user:connectId,text:obj.data.text}}))
    }else if(type ===`connected_room`){

    }else{
      console.log(`Type not found`);
    }
  });

  ws.on('close', () => {
    console.log('Сервер закрылся <----');
    rooms.delete(ws.connectId)
  });
});

server.listen(PORT, () => {
  console.log('server running on port', PORT);
});

module.exports = app;