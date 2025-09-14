module.exports=(sequelize,DataTypes)=>{
    const Customer=sequelize.define("Customer",{
      id:{ type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
      shopifyCustomerId:{type:DataTypes.BIGINT,allowNull:false},
      email:{type:DataTypes.STRING},
      firstName:{type:DataTypes.STRING},
      lastName:{type:DataTypes.STRING},
      totalSpent:{type:DataTypes.DECIMAL(10,2),defaultValue:0.00},
      


      });
      return Customer;
  
};