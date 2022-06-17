const { Sequelize } = require('sequelize');
require('dotenv').config();

let options = {
    dialect: 'postgres',
    logging: true,
}

if(process.env.NODE_ENV === 'development') {
    options.logging = true;
}else{
    options.dialectOptions ={
        ssl: {
            rejectUnauthorized: false
        }
    }
    options.logging = false;
};
    

const sequelize = new Sequelize(process.env.DATABASE_URL, options);

module.exports = sequelize;