const express = require(`express`)
const router = express.Router()
const fs = require(`fs/promises`)

router.post(`/`, async (req,res)=> {
    console.log(`Editing....`)
    await fs.appendFile(`./db/userdata.json`,`${req.params}`,`utf8`,(err) => {
        if (err) throw Error(err);
        console.log(`Done`);
    })
    res.end()
})

module.exports = router;
