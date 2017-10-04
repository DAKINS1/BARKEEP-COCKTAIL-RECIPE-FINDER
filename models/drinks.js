var JsonField = require('sequelize-json');
module.exports = function(sequelize, DataTypes){
    var DrinkList = sequelize.define('Drinks', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        drink_name: {
            type: DataTypes.STRING
        },
        ingredients: JsonField(sequelize, 'User', 'ingredients'),
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    }, {
        timestamps: false
    });
    return DrinkList;
}