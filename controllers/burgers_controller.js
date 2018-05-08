const express = require('express');
const model = require('../models');
const router = express.Router();

// gets and renders all burgers
router.get('/', function(req, res) {
  model.burgers.findAll().then(function(results) {
    const hbsObject = { burger: results };
    res.render('index', hbsObject);
  });
});

// posts a new burger to the db
router.post('/api/burgers', function(req, res) {
  //
});

// updates an existing burger, and selects that burger to display the update
router.put('/api/burgers/:id', function(req, res) {
  //
});

// export the routes for server.js
module.exports = router;
