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

router.get("/:id", (req, res) => {
  const { id } = req.params;
    db.from("accounts")
      .where({id: id})
      .then(account => {
        res.status(200).json({data: account})
      })
})

router.post("/", (req, res) => {
    const accountData = req.body;
    db("accounts")
      .insert(accountData, "id")
      .then(ids => {
        const id = ids[0];
        db("accounts")
          .where({ id })
          .first()
          .then(accounts => {
            res.status(201).json({ data: accounts });
          });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  });

  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db.from("accounts")
      .where({id: id})
      .update(changes)
      .then(update_count => {
        if(update_count > 0) {
          res.status(200).json({message: "update successful"})
        }else {
          res.status(404).json({ message: "no posts by that id found" });
        }
        
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({error: err.message })
      })
  })

  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.from("accounts")
      .where({ id: id })
      .del()
      .then(deleted => {
        console.log(deleted)
        res.status(204).end()
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({error: err.message})
      })
  })

module.exports = router;