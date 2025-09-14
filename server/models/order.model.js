module.exports=(sequelize,DataTypes)=>{
    const Order=sequelize.define("Order",{
      id:{ type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
      shopifyOrderId:{type:DataTypes.BIGINT,allowNull:false},
      totalPrice:{type:DataTypes.DECIMAL(10,2)},
      orderNumber:{type:DataTypes.INTEGER},
      processedAt:{type:DataTypes.DATE}, // Shopify wla "processed at" timestamp use kiya


      });
      return Order;
  
};