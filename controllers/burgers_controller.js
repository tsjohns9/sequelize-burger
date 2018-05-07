const express = require('express');
const burger = require('../models/burger');
const router = express.Router();

// gets and renders all burgers
router.get('/', function(req, res) {
  // this callback gets passed into orm.selectAll, represented by param named callback
  burger.selectAll(function(data) {
    const hbsObject = {
      burger: data
    };
    res.render('index', hbsObject);
  });
});

// posts a new burger to the db
router.post('/api/burgers', function(req, res) {
  burger.create('burger_name', req.body.name, function(result) {
    res.json({ id: result.insertId });
  });
});

// updates an existing burger, and selects that burger to display the update
router.put('/api/burgers/:id', function(req, res) {
  burger.update(req.body.id, req.body.devoured, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// export the routes for server.js
module.exports = router;
