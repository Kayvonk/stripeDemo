
"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

export default function Home() {

  const [clientSecret, setClientSecret] = useState("");

  const [subTotal, setSubTotal] = useState(null);
  const [userCart, setUserCart] = useState([]);

  

  useEffect(() => {
      let total = 9.99;
      
      setSubTotal(Math.round(total * 100));

  }, []);  

  useEffect(() => {
    if(!subTotal) {
      return
    }
    // if (userCart && userCart.length > 0) {
    if (userCart) {
      let endpointURL = "http://localhost:3001/api/create-payment-intent"
      fetch(endpointURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: subTotal,
          products: userCart.map(item => ({
            productId: item._id,
            quantity: item.quantity,
          })),
        }),
      })
        .then(async (result) => {
          const { clientSecret } = await result.json();
          setClientSecret(clientSecret);
        })
        .catch(error => {
          console.error("Error creating PaymentIntent:", error);
        });
    }
  }, [subTotal]);


  return (
    <>
      <main className={styles.checkoutContainer}>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm amount={subTotal} />
        </Elements>
      )}     
      </main>
    </>
  );
}
