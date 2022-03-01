const stripe = require("stripe")(process.env.STRIPE_SK);
const Abonnement = require("../models/abonnement.model");

exports.stripewebhook = (req, res) => {

  let data;
  let eventType;

  const webhookSecret = process.env.WEBHOOKSECRET;

  if (webhookSecret) {

    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err);
      return res.sendStatus(400);
    }
    data = event.data;
    eventType = event.type;
  } else {
    data = req.body.data;
    eventType = req.body.type;
  }

  switch (eventType) {

    case "payment_intent.succeeded":

      // const productIdArray = [];
      
      // JSON.parse(data.object.metadata.cart).forEach(element => {
      //   productIdArray.push(element.id);
      // });
      
      const newAbonnement = new Abonnement({
        amount: 30,
        date: data.object.created,
        user: data.object.metadata.userId,
        products: "abonnement normale",
        stripeId: data.object.id,
        status: data.object.status
      });

      newAbonnement.save().then((data) => console.log(data)).then(err => console.log(err));
    
      break;
    
    default:
      
  }
  res.sendStatus(200);
};
