const express = require(`express`);
const router = express.Router();

const fs = require(`fs/promises`);

router.get(`/parse`, async (req, res) => {
  console.log(`parsing....`);
  const data = await fs.readFile(`./db/post.json`, `utf8`);
  res.json(JSON.parse(data));
});

router.post(`/create`, async (req, res) => {
  console.log(`save...`, req.body);
  const data = await fs.readFile(`./db/post.json`, `utf8`);
  let dataTake = JSON.parse(data);
  let identifier = new Date().getTime();
  dataTake.push({ id: identifier, ...req.body });
  await fs.writeFile(`./db/post.json`, JSON.stringify(dataTake));
  res.json(dataTake);
});

router.put(`/edit`, async (req, res) => {
  console.log(`Editing...`, req.body);
  const data = await fs.readFile(`./db/post.json`, `utf8`);
  let dataTake = JSON.parse(data);
  dataTake.forEach((item) => {
    if (item.id == req.body.id) {
      let index = dataTake.indexOf(item);
      let newData = dataTake.splice(index, 1)
      newData = newData[0]
      newData.body = req.body.body
      dataTake.push(newData)
      fs.writeFile(`./db/post.json`, JSON.stringify(dataTake));
    }else{
      res.sendStatus(400)
    }
  });
  res.sendStatus(200);
});

router.delete(`/delete/:postId`, async (req, res) => {
  console.log(`deleting...`, req.params);
  const data = JSON.parse(await fs.readFile(`./db/post.json`, `utf8`));
  let el = 0;
  for (let i of data) {
    if (i.id == req.params.postId) {
      data.splice(el, 1);
    } else {
      el++;
    }
  }
  await fs.writeFile(`./db/post.json`, JSON.stringify(data));
  res.sendStatus(200);
});

module.exports = router;
