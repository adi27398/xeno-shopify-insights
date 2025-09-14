module.exports=(sequelize,DataTypes)=>{
    const Tenant=sequelize.define("Tenant",{
      id:{ 
        
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      shopifyShopDomain:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
      },
      shopifyAccessToken:{
        type:DataTypes.STRING,
        allowNull:false
      }



    });
      return Tenant;
  
};