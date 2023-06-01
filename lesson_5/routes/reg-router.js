const express = require(`express`);
const router = express.Router();
const fs = require('fs/promises');

router.post(`/user`, async (req,res)=>{
    console.log(`parsing....`)
    let data = await fs.readFile(`./db/regUsers.json`, `utf8`)
    data = JSON.parse(data)
    console.log(data)
    let user = req.body
    data.push(user)
    await fs.writeFile(`./db/regUsers.json`, JSON.stringify(data))
    console.log(data)
    res.send(data)
})

router.get(`/take`, async (req,res)=>{
    console.log(`parsing....`)
    let data = await fs.readFile(`./db/regUsers.json`, `utf8`)
    res.send(data)
})

router.post(`/check`, async (req,res)=>{
    console.log(`parsing....`)
    let data = await fs.readFile(`./db/regUsers.json`, `utf8`)
    let users = JSON.parse(data)
    for(let user of users){
        if(user.email == req.body.email && user.name == req.body.name){
            return res.sendStatus(200)
        }
    }
    return res.sendStatus(403)
})

module.exports = router;