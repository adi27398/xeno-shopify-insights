const crypto=require('crypto');
const db=require('../models');
const dataSyncService=require('../services/dataSync.service');

const verifyShopifyWebhook=(req,res,next)=>{
  const hmac=req.get('X-Shopify-Hmac-Sha256');
  const body=req.rawBody;  // server.js mein iska middleware add karenge
  const shopDomain=req.get('X-Shopify-Shop-Domain');

  if(!hmac || !body || !shopDomain){
    return res.status(401).send('Unauthorized:Missing Shopify headers.');
  }

  const hash=crypto
    .createHmac('sha256',process.env.SHOPIFY_API_SECRET)
    .update(body,'utf8','hex')
    .digest('base64');

  if(hash === hmac){
    //hmac valid hai ab age badho
    next();
  }else{
    return res.status(401).send('Unauthorized:Webhook HMAC validation failed.');

  }
};

const handleOrderCreate= async (req,res)=>{
  try{
      const shopDomain=req.get('X-Shopify-Shop-Domain');
      const orderData=req.body;

      //tenant ko dhundho is shop se related wali

      const tenant=await db.tenants.findOne({where:{shopifyShopDomain: shopDomain }});
      if(!tenant){
        console.warn(`Webhook received for unknown tenant:${shopDomain}`);
        return res.status(200).send('Tenant not found,but acknowledged.');
      }

      //service layer ko pass karo taki database logic handle ho ske 
      await dataSyncService.upsertOrder(tenant.id,orderData);
      return res.status(200).send('Webhook processed successfully.');
  }catch(error){
       console.error('Failed to process order/create webhook:',error);
       res.status(500).send('Internal Server Error');
  }

};


const handleCustomerCreate= async (req,res)=>{
  try{
      const shopDomain=req.get('X-Shopify-Shop-Domain');
      const customerData=req.body;

      const tenant=await db.tenants.findOne({where:{shopifyShopDomain: shopDomain }});
      if(!tenant){
        console.warn(`Webhook received for unknown tenant:${shopDomain}`);
        return res.status(200).send('Tenant not found,but acknowledged.');
      }
      await dataSyncService.upsertCustomer(tenant.id,customerData);
      return res.status(200).send('Webhook processed successfully.');
  }catch(error){
       console.error('Failed to process customer/create webhook:',error);
       res.status(500).send('Internal Server Error');
  }

};

const handleProductCreate= async (req,res)=>{
  try{
      const shopDomain=req.get('X-Shopify-Shop-Domain');
      const productData=req.body;

      const tenant=await db.tenants.findOne({where:{shopifyShopDomain: shopDomain }});
      if(!tenant){
        console.warn(`Webhook received for unknown tenant:${shopDomain}`);
        return res.status(200).send('Tenant not found,but acknowledged.');
      }
      await dataSyncService.upsertProduct(tenant.id,productData);
      return res.status(200).send('Webhook processed successfully.');
  }catch(error){
       console.error('Failed to process customer/create webhook:',error);
       res.status(500).send('Internal Server Error');
  }

};





module.exports={
  verifyShopifyWebhook,
  handleOrderCreate,
  handleCustomerCreate,
  handleProductCreate,
};


  