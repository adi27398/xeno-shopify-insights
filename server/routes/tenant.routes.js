const controller=require("../controllers/tenant.controller");

module.exports=function(app){
  app.post("/api/tenants/onboard",controller.onboard);
};