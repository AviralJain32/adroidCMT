import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { amount, customerDetails } = await request.json();
    console.log(amount);

    

    const customer = await stripe.customers.create({
      name: customerDetails.name,
      address: {
        line1: customerDetails.address.line1,
        postal_code: customerDetails.address.postal_code,
        city: customerDetails.address.city,
        state: customerDetails.address.state,
        country: customerDetails.address.country,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      customer: customer.id,
      description: 'Adroid Cmt Pro Plan',
      // payment_method_types: ["card", "upi", "netbanking", "wallet"],
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
