const dbConfig=require("../config/db.config.js");
const {Sequelize,DataTypes}=require("sequelize");

const sequelize=new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host:dbConfig.HOST,
    dialect:dbConfig.dialect,
    operatorsAliases:0, //false ki jagah 0 istemal kiya 
    pool:{
         max:dbConfig.pool.max,
         min:dbConfig.pool.min,
         acquire:dbConfig.pool.acquire,
         idle:dbConfig.pool.idle
    }

});

const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;

  
//models ko import karo

db.tenants=require("./tenant.model.js")(sequelize,DataTypes);
db.users=require("./user.model.js")(sequelize,DataTypes);
db.customers=require("./customer.model.js")(sequelize,DataTypes);
db.products=require("./product.model.js")(sequelize,DataTypes);
db.orders=require("./order.model.js")(sequelize,DataTypes);

// ek tenant ke pass bahut sare ho skte hai 
db.tenants.hasMany(db.users,{foreignKey:'tenantId',as:"users"});
db.tenants.hasMany(db.customers,{foreignKey:'tenantId',as:"customers"});
db.tenants.hasMany(db.products,{foreignKey:'tenantId',as:"products"});
db.tenants.hasMany(db.orders,{foreignKey:'tenantId',as:"orders"});

//yeh sirf ek tenant ke liye 
db.users.belongsTo(db.tenants,{foreignKey:'tenantId',as:"tenant"});
db.customers.belongsTo(db.tenants,{foreignKey:'tenantId',as:"tenant"});
db.products.belongsTo(db.tenants,{foreignKey:'tenantId',as:"tenant"});
db.orders.belongsTo(db.tenants,{foreignKey:'tenantId',as:"tenant"});

module.exports=db;

