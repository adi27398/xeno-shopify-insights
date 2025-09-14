const db=require('../models');
const {Sequelize}=require('sequelize');

// upsert istemal krke hm dono handle kr skte hai create aur update webhook ek function ke through
const upsertOrder=async(tenantId,orderData)=>{
  const orderPayload={
    shopifyOrderId: orderData.id,
    totalPrice:orderData.total_price,
    orderNumber:orderData.order_number,
    processedAt:orderData.processsed_at || orderData.created_at,
    tenantId:tenantId  //multitenancy ke liye imp
  };
  
  //find aur create karo order shopify id se joh ki ek specific user ki hai 
  await db.orders.upsert(orderPayload,{
    where:{shopifyOrderId: orderData.id,tenantId:tenantId},


  });

  

  console.log(`[Sync Service] Processed Order #${orderData.order_number} for Tenant ID: ${tenantId}`);
  if(orderData.customer){
    const customerData=orderData.customer;

    const [customer,created]=await db.customers.findOrCreate({
      where:{
        shopifyCustomerId: customerData.id,
        tenantId:tenantId
      },
      defaults:{
        email:customerData.email,
        firstName:customerData.first_name,
        lastName:customerData.last_name || '',
        totalSpent:0
      }
    });
    if(created){
      console.log(`[Sync Service] Created new customer from order: ${customer.email}`);

    }else{
      console.log(`[Sync Service] Found existing customer from order: ${customer.email}`);
      customer.firstName=customer.first_name;
      customer.lastname=customer.last_name || customer.lastname || '';
      await customer.save();
    }

    await customer.increment('totalSpent',{by: parseFloat(orderData.total_price)});
    console.log(`[Sync Service] Updated total spend for ${customer.email}`);
  }

};
const upsertCustomer=async(tenantId,customerData)=>{
  const customerPayload={
    shopifyCustomerId:customerData.id,
    email:customerData.email,
    firstName:customerData.first_name,
    lastName:customerData.last_name,
    totalSpent:customerData.total_spent || 0.00,
    tenantId: tenantId
  };

  await db.customers.upsert(customerPayload,{

    conflictFields:['shopifyCustomerId','tenantId']

  });

  console.log(`[Sync Service] Processed Customer: ${customerData.email} for Tenant ID: ${tenantId}`);
};



const upsertProduct=async(tenantId,productData)=>{
  const productPayload={
    shopifyProductId:productData.id,
    title:productData.title,
    vendor:productData.vendor,
    tenantId: tenantId
  };

  await db.products.upsert(productPayload);


  console.log(`[Sync Service] Processed Product: ${productData.title} for Tenant ID: ${tenantId}`);
};





module.exports={
  upsertOrder,
  upsertCustomer,
  upsertProduct,
};