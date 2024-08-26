
"use client";

import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import styles from "@/styles/CheckoutForm.module.css";
import { useRouter } from "next/navigation";


export default function CheckoutForm({ amount }) {
  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userCart, setUserCart] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
      redirect: "if_required",
    });

    if (error) {
      console.log(error.message);
      setMessage(error.message);
      setIsProcessing(false);
    } else {
      setMessage("Payment successful!");
      setIsProcessing(false);
      completeOrder();
    }
  };

  const completeOrder = async () => {

    try {
      const orderData = {
        user: user?._id,
        products: userCart?.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        totalAmount: parseFloat(amount),
        orderDate: new Date(),
      };

      // const response = await API.saveOrder({
      //   ...orderData
      // });

      setOrderSent(true)
      // router.push("/completed");
      
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />

      <button
        disabled={!stripe || !elements}
        id="submit"
        className={styles.submitButton}
      >
        Pay {amount / 100} USD
      </button>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
