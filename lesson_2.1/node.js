let express = require(`express`)
let app = express()
let fs = require(`fs/promises`)

const PORT = 3000

app.get(`/`, (req,res)=>{
    res.end(`Main`)
})

app.get(`/web`,async (req,res)=>{
    const data = await fs.readFile(`./web.txt`,`utf8`)
    res.send(data)
})
app.get(`/csharp`,async (req,res)=>{
    const data = await fs.readFile(`./csharp.txt`,`utf8`)
    res.send(data)
})
app.get(`/database`,async (req,res)=>{
    const data = await fs.readFile(`./database.txt`,`utf8`)
    res.send(data)
})
app.get(`/gamedev`,async (req,res)=>{
    const data = await fs.readFile(`./gamedev.txt`,`utf8`)
    res.send(data)
})

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))