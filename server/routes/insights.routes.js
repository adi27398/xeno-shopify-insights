const { verifyToken }=require("../middleware/auth.middleware");
const controller=require("../controllers/insights.controller");


module.exports=function(app){
  app.use(function(req,res,next){
    res.header(
      "Access-control-Allow-Headers",
      "Authorization,Origin,Content-Type,Accept"
    );
    next();
  });

  // sare routes protected hai aur valid token require krenege 
  //verify tokeb midddleware bse pehle run hoga 
  app.get("/api/insights/summary",[verifyToken],controller.getSummary);
  app.get("/api/insights/orders-by-date",[verifyToken],controller.getOrdersByDate);
  app.get("/api/insights/top-customers",[verifyToken],controller.getTopCustomers);
};