const express = require('express');
const model = require('../models');
const router = express.Router();

// gets and renders all burgers
router.get('/', function(req, res) {
  model.Burgers.findAll().then(function(results) {
    const hbsObject = { burger: results };
    res.render('index', hbsObject);
  });
});

// posts a new burger to the db
router.post('/api/burgers', function(req, res) {
  console.log(req.body);
  model.Burgers.create({
    burger_name: req.body.name,
    devoured: 0
  }).then(result => res.json({ id: result.dataValues.id }));
});

// updates an existing burger, and selects that burger to display the update
router.put('/api/burgers/:id', function(req, res) {
  console.log(req.body);
  model.Burgers.update(req.body.devoured, {
    where: req.body.id
  }).then(result => {
    console.log(result);
    res.status(200).end();
  });
});

// export the routes for server.js
module.exports = router;
