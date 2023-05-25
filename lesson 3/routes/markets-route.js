const express = require(`express`);
const router = express.Router();
const fs = require('fs/promises');

router.get(`/`, async (req, res) => {
  console.log(`parsing...`)
  const data = await fs.readFile(`./db/markets.json`, `utf8`)
  console.log(data)
  res.json(JSON.parse(data))
});

module.exports = router;
