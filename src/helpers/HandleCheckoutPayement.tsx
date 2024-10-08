import { loadStripe } from '@stripe/stripe-js';
export const HandleCheckoutPayement = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");
    const stripe = await stripePromise;
  
    const response = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    //   body: JSON.stringify({
    //     priceId: 'price_1234', // Replace with your actual price ID
    //     customerName: 'John Doe', // Customer's name
    //     addressLine1: '123 Main Street',
    //     addressLine2: '', // Optional
    //     city: 'Mumbai',
    //     state: 'MH',
    //     postalCode: '400001',
    //   }),
    });
  
    const session = await response.json();
  
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
  
      if (error) {
        console.error('Stripe checkout error:', error);
      }
    }
  };