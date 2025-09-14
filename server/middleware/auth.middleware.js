const jwt=require('jsonwebtoken');
const verifyToken=(req,res,next)=>{
  let token=req.headers["authorization"];

  if(!token){
    return res.status(403).send({message:"No token provided!"});
  }

  // token ko bearer format mein expect kiya jata hai 

  token=token.split(' ')[1];

  jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
    if(err){
       return res.status(401).send({message:"Unauthorized!"});

    }
    //decoded payload add karo request object mein 
    req.userId=decoded.userId;
    req.tenantId=decoded.tenantId;
    next();
  });
};

module.exports={ verifyToken };