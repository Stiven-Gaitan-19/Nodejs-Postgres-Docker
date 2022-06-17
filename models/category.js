const { Model, DataTypes, NOW } = require('sequelize');

class Category extends Model {
    static assosiate(entity) {
        this.hasMany(entity, { as: 'products', foreignKey: 'categoryId'});
    }
}

let schema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    image: { 
        allowNull: false, 
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: NOW,
    }
};

module.exports = { Category, categorySchema: schema };
