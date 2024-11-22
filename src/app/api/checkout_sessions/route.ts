import dbConnect from '@/lib/dbConnect';
import { getServerSession, User } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { authOptions } from '../auth/[...nextauth]/options';
import ConferenceModel from '@/model/Conference';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


export async function POST(req: NextRequest) {
  await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

  try {
    const { origin } = req.nextUrl; // Get the origin from the request
    const UserConferences=await ConferenceModel.find({
      conferenceOrganizer:user._id,conferenceSecurityDeposit2000Paid:false
    })
    // const body = await req.json(); // Parse the JSON body

//     const customer=await stripe.customers.create({
//         name: body.customerName, // Pass the customer name
// })
    // Creating the Stripe Checkout session with customer details
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      invoice_creation: {
        enabled: true,
      },
      line_items: [
        {
          price_data: {
            currency: 'USD',
            // currency: 'INR',

            product_data: {
              name: 'Payment for Services',
            },
            unit_amount: 5000, // 2000 INR in the smallest currency unit (paisa)
          },
          quantity: 1,
        },
      ],
      custom_fields: [
        {
          key: 'conferenceSelection',
          label: {
            type: 'custom',
            custom: 'Choose the conference',
          },
          type: 'dropdown',
          dropdown: {
            options: UserConferences.map((conference)=>{
              return {
                label:`${conference.conferenceAcronym}`,
                value:`${conference._id}`
              }
            })
    }
  }],
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
    console.log(err)
    return new NextResponse(err.message, { status: err.statusCode || 500 });
  }
}
