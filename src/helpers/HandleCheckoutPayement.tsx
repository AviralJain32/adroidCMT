
// import { loadStripe } from '@stripe/stripe-js';
// export const HandleCheckoutPayement = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

//     const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");
//     const stripe = await stripePromise;
  
//     try {
//       const response = await fetch('/api/checkout_sessions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const session = await response.json();
      
    
//       if (stripe) {
//         const { error } = await stripe.redirectToCheckout({
//           sessionId: session.id,
//         });
    
//         if (error) {
//           console.error('Stripe checkout error:', error);
//         }
//       }
//       return session
//     } catch (error:any) {
//       console.error('Stripe checkout error:', error);
//       return {error:"Please Sign In !!"}
//     }
//   };


import { loadStripe } from '@stripe/stripe-js';

export const handleCheckoutPayment = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  // Ensure the Stripe public key is available
  const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
  if (!stripePublicKey) {
    console.error('Stripe public key is missing.');
    return { error: 'Stripe configuration error. Please try again later.' };
  }

  const stripePromise = loadStripe(stripePublicKey);
  const stripe = await stripePromise;

  if (!stripe) {
    console.error('Stripe initialization failed.');
    return { error: 'Unable to initialize payment gateway. Please try again later.' };
  }

  try {
    const response = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

if (!response.ok) {
  console.error('Failed to create checkout session:', response.statusText);
  return { error: 'Failed to initiate payment. Please log in or sign up and try again.' };
}

    const session = await response.json();

    if (!session.id) {
      console.error('Invalid session data:', session);
      return { error: 'Invalid session data. Please try again later.' };
    }

    const { error } = await stripe.redirectToCheckout({ sessionId: session.id });

    if (error) {
      console.error('Stripe checkout error:', error.message);
      return { error: 'Payment redirection failed. Please try again.' };
    }

    return session;
  } catch (error: any) {
    console.error('Unexpected error:', error.message || error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
};
