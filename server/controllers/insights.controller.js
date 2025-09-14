const db=require('../models');
const { Op }=require('sequelize');

exports.getSummary=async(req,res)=>{
  const { tenantId }=req;  //auth middlreware se attached hai
  try{
    const totalCustomers=await db.customers.count({where: { tenantId } });
    const totalOrders=await db.orders.count({where:{tenantId}});
    const totalRevenue = await db.orders.sum('totalPrice',{where:{tenantId}});
    const totalProducts=await db.products.count({where:{ tenantId}});
    res.status(200).json({
      totalCustomers,
      totalOrders,
      totalRevenue:totalRevenue || 0,
      totalProducts,
    });
  }catch(error){
    res.status(500).send({message:error.message});
  }
};

exports.getOrdersByDate= async(req,res)=>{
  const {tenantId }=req;
  const {start,end}=req.query;
  if(!start || !end){
    return res.status(400).send({message:"Start and end date queries are required."});

  }
  try{
    const orders=await db.orders.findAll({
      where:{
        tenantId,
        processedAt:{[Op.between]:[new Date(start),new Date(end)]},

      },
      attributes:[
        [db.sequelize.fn('DATE',db.sequelize.col('processedAt')),'date'],
        [db.sequelize.fn('COUNT',db.sequelize.col('id')),'orderCount'],
        [db.sequelize.fn('SUM',db.sequelize.col('totalPrice')),'dailyRevenue'],
      ],
      group:['date'],
      order:[['date','ASC']],
    });
    res.status(200).json(orders);
  }catch(error){
    res.status(500).send({message:error.message});
  }
};

exports.getTopCustomers=async(req,res)=>{
  const {tenantId}=req;
  try{
    //
    const customers=await db.customers.findAll({
      where:{ tenantId },
      order:[['totalSpent','DESC']],
      limit:5,
    });
    res.status(200).json(customers);
  }catch(error){
    res.status(500).send({message: error.message});
  }

  
};