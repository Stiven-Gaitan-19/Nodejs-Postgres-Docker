const { Model, DataTypes, NOW } = require('sequelize');

class Product extends Model {
    static assosiate(entity) {
        this.belongsTo(entity, { as: 'category' });
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
    description: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
    },
    categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'category_id',
        preferences: {
            model: 'categories',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
};

module.exports = { Product, productSchema: schema };
