const db=require("../models");
const User=db.users;
const Tenant=db.tenants;

const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

exports.signup=async(req,res)=>{
  try{


    // asli app mein hmare pass flow hoga  user to invite krne ke liye tenant mein
    //abhi ke liye  hm manlenge ki pehle user ne sign up kiya hai 
    // shop domain ke through hm tenannt foind krenge 
    const {email,password,shopifyShopDomain}=req.body;

    const tenant=await Tenant.findOne({where:{shopifyShopDomain}});
    if(!tenant){
      return res.status(404).send({message:"Tenant not found.Please register the store first."});

    }
    const user=await User.create({
      email:email,
      password:bcrypt.hashSync(password,8),
      tenantId: tenant.id

    });
    res.status(201).send({message:"User registered successfully!"});

  }catch(error){
    res.status(500).send({message:error.message});
  }
};

exports.signin=async(req,res)=>{
  try{
    const user=await User.findOne({where:{email:req.body.email}});

    if(!user){
      return res.status(404).send({message:"User Not found."});
    }

    const passwordIsValid=bcrypt.compareSync(req.body.password,user.password);

    if(!passwordIsValid){
      return res.status(401).send({accessToken:null,message:"Invalid Password!"});
    }
    const token=jwt.sign({userId: user.id,tenantId:user.tenantId},process.env.JWT_SECRET,{
      expiresIn:86400 // 24 hours

    });
    res.status(200).send({
      id:user.id,
      email:user.email,
      tenantId:user.tenantId,
      accessToken:token
    });

  }catch(error){
    res.status(500).send({message:error.message});
  }
};