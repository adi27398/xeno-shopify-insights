const controller=require("../controllers/webhook.controller");

module.exports=function(app){
   // sare webhooks ko hmac verification pass krna padega
  app.post(
    "/api/webhooks/orders-create",
    controller.verifyShopifyWebhook,
    controller.handleOrderCreate
  );

   app.post(
    "/api/webhooks/customers-create",
    controller.verifyShopifyWebhook,
    controller.handleCustomerCreate
  );

  app.post(
    "/api/webhooks/products-create",
    controller.verifyShopifyWebhook,
    controller.handleProductCreate
  );

};