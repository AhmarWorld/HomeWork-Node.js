require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require(`path`)

const { v4: uuidv4 } = require('uuid');
const { WebSocketServer } = require('ws');

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Create an HTTP server
const server = http.createServer(app);
const wss = new WebSocketServer({ clientTracking: false, noServer: true });

app.get('/', (req, res) => res.end('aa'))


app.get(`/room`, async(req,res)=>{
  res.sendFile(path.join(__dirname + `/room.html`))
})

// part1
server.on('upgrade', (request, socket, head) => {
  console.log('Parsing session from request...');

    console.log('Session is parsed!');

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  
});

const maxClients = 2;
const conntects = new Map();
let users = []
const rooms = {};

app.get(`/users`,(req,res)=>{
  res.send(users)  
})

// part2
wss.on('connection', (ws, request) => {
    console.log('connected')
    const connectId = uuidv4()
    ws.connectId = connectId
    conntects.set(connectId, ws)
    users.push(`${connectId}`)
  ws.on('message', (message) => {
    const obj = JSON.parse(message);
    console.log(obj);
    const { type } = obj;
    console.log(obj);

    if(type === `new_message`){
      conntects.forEach(w=> w.send(JSON.stringify({type:`new_message`,data:{user:connectId,text:obj.data.text}})))
    }else if(type ===`new_room`){
      const roomId = uuidv4()
      ws.roomId = roomId
      rooms[roomId] = [ws]
      ws.send(JSON.stringify({type:`new_room`, data:{roomId}}))
    }else if(type === `join_room`){
      if(rooms[obj.data.roomId]) rooms[obj.data.roomId].push(ws)
      console.log()
    }
  });

  ws.on('close', () => {
    console.log('onclose functiont <----');
    conntects.delete(ws.connectId)
  });
});

server.listen(PORT, () => {
  console.log('server running on port', PORT);
});

module.exports = app;