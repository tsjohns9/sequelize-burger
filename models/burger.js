module.exports = function(sequelize, dataTypes) {
  const Burger = sequelize.define(
    'Burgers',
    {
      burger_name: {
        type: dataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-z]+$/i,
          len: { args: [1, 24], msg: 'Must be between 1 and 24 characters' }
        }
      },
      devoured: { type: dataTypes.BOOLEAN, allowNull: false }
    },
    { timestamps: false }
  );

  // hasOne will add an attribute of burgerId to the Burgers model
  // Burger.associate = function(models) {
  //   Burger.hasOne(models.Customers, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Burger;
};
