module.exports=(sequelize,DataTypes)=>{
    const Product=sequelize.define("Product",{
      id:{ type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
      shopifyProductId:{type:DataTypes.BIGINT,allowNull:false},
      title:{type:DataTypes.STRING},
      vendor:{type:DataTypes.STRING},


      });
      return Product;
  
};