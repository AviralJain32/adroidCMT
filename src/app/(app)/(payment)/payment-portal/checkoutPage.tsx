// import React, { useEffect, useState } from "react";
// import {
//   useStripe,
//   useElements,
//   PaymentElement,
// } from "@stripe/react-stripe-js";

// const CheckoutPage = ({ amount }: { amount: number }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState<string>();
//   const [clientSecret, setClientSecret] = useState("");
//   const [loading, setLoading] = useState(false);

//   function convertToSubcurrency(amount: number, factor = 100) {
//     return Math.round(amount * factor);
//   }

//   useEffect(() => {
//     fetch("/api/create-payment-intent", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         amount: convertToSubcurrency(amount),
//         customerDetails: {
//           name: "Jenny Rosen",
//           address: {
//             line1: "510 Townsend St",
//             postal_code: "98140",
//             city: "San Francisco",
//             state: "CA",
//             country: "US",
//           },
//         },
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, [amount]);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements) {
//       return;
//     }

//     const { error: submitError } = await elements.submit();

//     if (submitError) {
//       setErrorMessage(submitError.message);
//       setLoading(false);
//       return;
//     }

//     const { error } = await stripe.confirmPayment({
//       elements,
//       clientSecret,
//       confirmParams: {
//         return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
//       },
//     });

//     if (error) {
//       setErrorMessage(error.message);
//     }

//     setLoading(false);
//   };

//   if (!clientSecret || !stripe || !elements) {
//     return (
//       <div className="flex items-center justify-center">
//         {/* Loading Spinner */}
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
//       {clientSecret && <PaymentElement />}

//       {errorMessage && <div className="text-black">{errorMessage}</div>}

//       <button
//         disabled={!stripe || loading}
//         className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
//       >
//         {!loading ? `Pay $${amount}` : "Processing..."}
//       </button>
//     </form>
//   );
// };

// export default CheckoutPage;


