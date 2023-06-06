const express = require(`express`)
const fs = require(`fs/promises`)
const path = require(`path`)

const app = express()
const jsonRouter = require(`./routes/json-router.js`)

const PORT = 3000

app.use(express.static(`public`))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get(`/`, (req,res)=>{
    res.sendFile(path.join(__dirname+`/src/html/index.html`))
})

app.use(`/json`, jsonRouter)

app.use(function(req,res){
    res.status(404).sendFile(__dirname+`/src/html/error.html`)
})

app.listen(PORT, ()=>console.log(`Server has been started of PORT:${PORT}`))