const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Required to rate limits by Client IP
app.enable("trust proxy");

// Define middleware here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.options("*", cors());

app.use(
  session({ secret: "supersecret", resave: true, saveUninitialized: true })
);

app.use(routes);

// STRIPE
app.post('/api/create-payment-intent', async (req, res) => {
  
  try {
    const { amount, products } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      metadata: {
        integration_check: 'accept_a_payment',
        products: JSON.stringify(products),
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/stripedemodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
