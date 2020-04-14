const express = require("express");
db = require("../data/dbConfig.js");

const router = express.Router()

router.get("/", (req, res) => {
    db.select("*")
      .from("accounts")
      .then(accounts => {
          res.status(200).json({data: accounts})
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({error: err.message})
      })
})

module.exports = router;