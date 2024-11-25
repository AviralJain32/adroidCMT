import React from 'react';
import { Button } from '@/components/ui/button';
import PricingCard from './pricingCard';
import Link from 'next/link';
import { Faqs } from './faqs';
import PaymentButton from './PaymentButton';

interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  tagline:string
}

const PricingPage: React.FC = () => {
  const pricingData: PricingPlan[] = [
            {
              title: "Small Size Conference",
              price: "$0/paper",
              description: "1 - 100 Papers",
              tagline:"No money, no problem",
              features: [
                "Ideal for small conferences",
                "Cost-effective for new events",
                "Basic features",
              ],
              buttonText: "Choose Free",
            },
            {
              title: "Medium Size Conference",
              price: "$1.5/paper",
              description: "101 - 300 Papers",
              tagline:"per conference",
              features: [
                "Advanced management features",
                "Scalable for more attendees",
              ],
              buttonText: "Choose Medium",
            },
            {
              title: "Large Size Conference",
              price: "$1.25/paper",
              description: "301 - 500 Papers",
              tagline:"per conference",
              features: [
                "Priority support",
                "Lower cost per paper",
              ],
              buttonText: "Choose Large",
            },
            {
              title: "Extra Large Conference",
              price: "$1/paper",
              description: "501+ Papers",
              tagline:"per confererence",
              features: [
                "Best value for high-volume conferences",
                "Customizable features",
                "Dedicated account manager",
              ],
              buttonText: "Contact Us",
            },
          ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      
      {/* Information Section */}
      <div className="p-12 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-5xl font-bold text-center mb-10 text-blue-600">How It Works</h2>
      <div className="text-xl text-gray-800 text-center mb-8 space-y-6">
        <p className="font-semibold">
          Start with <span className="font-extrabold text-blue-700">100 papers for free.</span>
        </p>
        <ul className="list-disc list-inside text-left inline-block space-y-3">
          <li>Once you exceed the 100 paper limit, submit $50 to our platform.</li>
          <li>Add as many papers as you need after payment.</li>
          <li>After the conference ends, our system will generate an invoice.</li>
          <li>Invoice is based on the number of papers submitted and our price slabs. (Given Below)</li>
          <li>Invoice will be sent to your Email ID.</li>
        </ul>
      </div>
      <div className="text-center mt-10">
        {/* <Link href={"/payment-portal"}> */}
          <PaymentButton/>
          
        {/* </Link> */}
    </div>  
</div>

      
      {/* Pricing Section */}
      <h1 className="text-5xl font-medium text-center my-12">Conference Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {pricingData.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            buttonText={plan.buttonText}
            tagline={plan.tagline}
          />
        ))}
      </div>
      <h2 className="text-4xl font-semibold text-center mb-6">Frequently Asked Questions</h2>
      <Faqs/>
    </div>
  );
};

export default PricingPage;
