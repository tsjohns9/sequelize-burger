const orm = require('../config/orm');

const burger = {
  selectAll: function(callback) {
    orm.selectAll('burgers', function(res) {
      // this is the callback thats created in burgers_controller.js
      callback(res);
    });
  },

  create: function(column, value, callback) {
    orm.create('burgers', column, value, function(res) {
      callback(res);
    });
  },

  // update one row
  update: function(identifyBy, setValue, callback) {
    orm.update('burgers', identifyBy, setValue, function(res) {
      callback(res);
    });
  }
};

// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;
