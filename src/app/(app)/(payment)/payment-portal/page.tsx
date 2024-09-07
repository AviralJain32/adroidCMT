"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./checkoutPage";
import { useEffect, useState } from "react";
import CompletePage from "./completePage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const [clientSecret, setClientSecret] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const amount = 49.99;

  function convertToSubcurrency(amount: number, factor = 100) {
    return Math.round(amount * factor);
  }
  
    useEffect(() => {
    setConfirmed(new URLSearchParams(window.location.search).get("payment_intent_client_secret"));
  });

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Sonny</h1>
        <h2 className="text-2xl">
          has requested
          <span className="font-bold"> ${amount}</span>
        </h2>
      </div>

      {/* <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "inr",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements> */}
      {(
        <Elements options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "inr",
        }} stripe={stripePromise}>
          {confirmed ? <CompletePage /> : <CheckoutPage amount={amount} />}
        </Elements>
      )}
    </main>
  );
}

// "use client"
// import React from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CompletePage from "./completePage";
// import CheckoutForm from "./checkoutPage";


// // Make sure to call loadStripe outside of a component’s render to avoid
// // recreating the Stripe object on every render.
// // This is your test publishable API key.
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

// export default function App() {
//   const [clientSecret, setClientSecret] = React.useState("");
//   const [confirmed, setConfirmed] = React.useState(false);

//   React.useEffect(() => {
//     setConfirmed(new URLSearchParams(window.location.search).get("payment_intent_client_secret"));
//   });

//   React.useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//     fetch("/api/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, []);

//   const appearance = {
//     theme: 'stripe',
//   };
//   const options = {
//     clientSecret,
//     appearance,
//   };

//   return (
//     <div className="App">
//       {clientSecret && (
//         <Elements options={options} stripe={stripePromise}>
//           {confirmed ? <CompletePage /> : <CheckoutForm />}
//         </Elements>
//       )}
//     </div>
//   );
// }