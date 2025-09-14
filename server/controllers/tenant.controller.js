const db=require("../models");
const Tenant=db.tenants;

exports.onboard= async(req,res)=>{
  try{
    const{ shopifyShopDomain,shopifyAccessToken}=req.body;

    if(!shopifyShopDomain || !shopifyAccessToken){
       return res.status(400).send({message:"Shop domain and access token are required."});
    }
    const [tenant,created]=await Tenant.findOrCreate({
       where:{ shopifyShopDomain: shopifyShopDomain},
       defaults:{ shopifyAccessToken: shopifyAccessToken}
    });

    if(!created){
      return res.status(409).send({message:"This shop has already been onboarded."});
    }

    res.status(201).send({
      message:"Tenant onboarded successfully!",
      tenantId:tenant.id
    });
  }catch(error){
    res.status(500).send({message:error.message});
  }
};