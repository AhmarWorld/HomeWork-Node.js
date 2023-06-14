const express = require(`express`);
const { append } = require("express/lib/response");
const router = express.Router();

const fs = require(`fs/promises`);

router.get(`/users`, async (req, res) => {
  console.log(`parsing....`);
  const data = await fs.readFile(`./db/users.json`, `utf8`);
  res.json(JSON.parse(data));
});

router.post(`/users/create`, async(req,res)=>{
    console.log(`creating....`)
    const data = await fs.readFile(`./db/users.json`, `utf8`)
    let dataTake = JSON.parse(data)
    let identifier = new Date().getTime()
    dataTake.push({id:identifier, ...req.body})
    await fs.writeFile(`./db/users.json`, JSON.stringify(dataTake))
    res.json(dataTake)
})

module.exports = router;
