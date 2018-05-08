module.exports = function(sequelize, dataTypes) {
  const Burger = sequelize.define(
    'burgers',
    {
      burger_name: {
        type: dataTypes.STRING
      },
      devoured: {
        type: dataTypes.BOOLEAN
      }
    },
    {
      timestamps: false
    }
  );

  return Burger;
};
