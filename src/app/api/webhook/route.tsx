import dbConnect from '@/lib/dbConnect';
import ConferenceModel from '@/model/Conference';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: NextRequest) {
  await dbConnect();

  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    // Read the raw body
    const rawBody = await req.text(); // You need the raw body for the signature check
    // Verify the event by constructing it using the raw body and Stripe's signature
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig || '',
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: any) {
    console.error('⚠️ Webhook signature verification failed.', err.message);
    return NextResponse.json({ message: `Webhook Error: ${err.message}`, success: false }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Payment received successfully. Session ID:', session.id);
      // Fulfillment logic goes here
      await fulfillOrder(session);
      break;
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment intent succeeded:', paymentIntent);
      break;
    case 'payment_intent.payment_failed':
      const paymentFailed = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', paymentFailed);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ received: true }, { status: 200 });
}

// Fulfillment logic (e.g., update database, etc.)
async function fulfillOrder(session: Stripe.Checkout.Session) {
  console.log("****************************************************") 
  console.log(session);
  console.log("session dropdown value");
  console.log("****************************************************")
  console.log('Fulfilling order for session ID:', session.id);
  console.log(session.custom_fields[0].dropdown?.value)
  await ConferenceModel.updateOne({ _id: session.custom_fields[0].dropdown?.value }, {
    $set: { conferenceSecurityDeposit2000Paid: true }
  });
  console.log("field updated")
}
