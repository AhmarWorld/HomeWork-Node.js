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

module.exports = router;