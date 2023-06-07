const express = require(`express`)
const router = express.Router()

const fs = require(`fs/promises`)

router.get(`/parse`, async(req,res)=>{
    console.log(`parsing..`);
    const data = await fs.readFile(`./db/users.json`, `utf8`)
    res.json(JSON.parse(data))
})

router.post(`/save`, async(req, res)=>{
    console.log(`save...`, req.body);
    const data = await fs.readFile(`./db/users.json`)
    let dataTake = JSON.parse(data)
    dataTake.push(req.body)
    await fs.writeFile(`./db/users.json`, JSON.stringify(dataTake))
    res.sendStatus(200)
})

module.exports = router