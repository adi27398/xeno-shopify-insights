require('dotenv').config();
const express=require('express');
const cors=require('cors');
const app=express();

const allowedOrigins=[
  'http://localhost:3000',
  'https://xeno-frontend-916k.onrender.com',
];


const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};



//Middleware ka setup
app.use(cors(corsOptions));  // cross origin resource sharing enable krta hai 

//webhook verification ka key midddleware hai
//yeh json ko parse toh krta hai pr sath mein raw body ko nayi property 'req.body' mein save krta hai  
app.use(express.json({
  verify:(req,res,buf)=>{
    req.rawBody=buf;
  }

}));

//yeh standard middleware hai urlencoded payloads pass krne ke liye

app.use(express.urlencoded({extended:true}));

//database connection wla part 

const db=require("./models");
db.sequelize.sync()
  .then(()=>{
      console.log("Synced db.");

  })
  .catch((err)=>{
    console.log("Failed to sync db: " + err.message);
  });
  //api routes

app.get("/",(req,res)=>{
  res.json({message:"Welcome to the Xenon Insights Service API."});
});


require('./routes/auth.routes')(app);
require('./routes/tenant.routes')(app);
require('./routes/webhook.routes')(app);
require('./routes/insights.routes')(app);

// seerver start karo 
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}.`);
});