const connection = require('./connection');

module.exports = {
  // orm methods
  selectAll: function(table, callback) {
    const query = 'SELECT * FROM ??;';
    connection.query(query, [table], function(err, result) {
      if (err) throw err.stack;

      // this is the callback thats created in burger.js
      // that callback returns the callback from burgers_controller.js
      // the callback function written in burgers_controller.js gets executed here
      callback(result);
    });
  },
  create: function(table, column, value, callback) {
    const query = 'INSERT INTO ?? SET ?? = ?';
    connection.query(query, [[table], [column], [value]], function(err, result) {
      if (err) throw err.stack;
      callback(result);
    });
  },

  update: function(table, identifyBy, setValue, callback) {
    const query = 'UPDATE ?? SET ? WHERE ?';
    connection.query(query, [[table], setValue, identifyBy], function(err, result) {
      if (err) throw err.stack;
      callback(result);
    });
  }
};
