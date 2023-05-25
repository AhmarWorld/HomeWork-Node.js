const express = require('express');
const app = express();

const fs = require('fs/promise')

const PORT = 3000;

app.get('/', (req, res) => {
    res.end('aaa')
});

app.get('/first', (req, res) => {
    res.send('first')
});

app.get('/second', async (req, res) => {
    const data = await fs.readFile('./second', 'utf8');
    res.json(data);
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))