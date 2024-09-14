import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


export async function POST(req: NextRequest) {
  try {
    const { origin } = req.nextUrl; // Get the origin from the request
    // const body = await req.json(); // Parse the JSON body

//     const customer=await stripe.customers.create({
//         name: body.customerName, // Pass the customer name
// })
    // Creating the Stripe Checkout session with customer details
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'INR',
            product_data: {
              name: 'Payment for Services',
            },
            unit_amount: 200000, // 2000 INR in the smallest currency unit (paisa)
          },
          quantity: 1,
        },
      ],
      billing_address_collection:'required',
    //   phone_number_collection:true,
      mode: 'payment',
      // customer:customer.id,
      success_url: `${origin}/payment-success`,
      cancel_url: `${origin}/cancel-payment`,
      // payment-cancel?canceled=true
    });

    
    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    return new NextResponse(err.message, { status: err.statusCode || 500 });
  }
}
