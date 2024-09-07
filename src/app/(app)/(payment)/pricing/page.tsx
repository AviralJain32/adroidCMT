// import React from 'react';
// import { Button } from '@/components/ui/button';
// import PricingCard from './pricingCard';
// import Link from 'next/link';
// import { Faqs } from './faqs';

// interface PricingPlan {
//   title: string;
//   price: string;
//   description: string;
//   features: string[];
//   buttonText: string;
//   tagline:string
// }

// const PricingPage: React.FC = () => {
//   const pricingData: PricingPlan[] = [
//         {
//           title: "Small Size Conference",
//           price: "₹0/paper",
//           description: "1 - 100 Papers",
//           tagline:"No money, no problem",
//           features: [
//             "Ideal for small conferences",
//             "Cost-effective for new events",
//             "Basic features",
//           ],
//           buttonText: "Choose Free",
//         },
//         {
//           title: "Medium Size Conference",
//           price: "₹100/paper",
//           description: "101 - 300 Papers",
//           tagline:"per conference",
//           features: [
//             "Advanced management features",
//             "Scalable for more attendees",
//           ],
//           buttonText: "Choose Medium",
//         },
//         {
//           title: "Large Size Conference",
//           price: "₹70/paper",
//           description: "301 - 500 Papers",
//           tagline:"per conference",
//           features: [
//             "Priority support",
//             "Lower cost per paper",
//           ],
//           buttonText: "Choose Large",
//         },
//         {
//           title: "Extra Large Conference",
//           price: "₹50/paper",
//           description: "501+ Papers",
//           tagline:"per confererence",
//           features: [
//             "Best value for high-volume conferences",
//             "Customizable features",
//             "Dedicated account manager",
//           ],
//           buttonText: "Contact Us",
//         },
//       ];
    

//   return (
//     <div className="max-w-7xl mx-auto p-6">
      
//       {/* Information Section */}
//       <div className="p-8">
//         <h2 className="text-4xl font-semibold text-center mb-6">How It Works ?</h2>
//         <p className="text-lg text-gray-700 text-center mb-6">
//           Start with 100 papers for free. Once you exceed the 100 paper limit, you can submit ₹2000 (23.82 usd) to our platform and add as many papers as you need. After the conference ends, our system will generate an invoice based on the number of papers submitted and our price slabs and send it to your Email ID.
//         </p>
//         <div className="text-center">
//           <Link href={"/payment-portal"}>
//           <Button variant="default" size="lg" className="px-8 py-4">
//             Pay 2000 Rs
//           </Button>
//           </Link>
//         </div>
//       </div>
//       {/* Pricing Section */}
//       <h1 className="text-5xl font-medium text-center mb-12">Conference Pricing Plans</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
//         {pricingData.map((plan, index) => (
          
//           <PricingCard
//             key={index}
//             title={plan.title}
//             price={plan.price}
//             description={plan.description}
//             features={plan.features}
//             buttonText={plan.buttonText}
//             tagline={plan.tagline}
//           />
//         ))}
//       </div>
//       <h2 className="text-4xl font-semibold text-center mb-6">Frequently asked questions</h2>
//       <Faqs/>
//     </div>
//   );
// };

// export default PricingPage;



import React from 'react';
import { Button } from '@/components/ui/button';
import PricingCard from './pricingCard';
import Link from 'next/link';
import { Faqs } from './faqs';

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
              price: "₹0/paper",
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
              price: "₹100/paper",
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
              price: "₹70/paper",
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
              price: "₹50/paper",
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
      <h2 className="text-5xl font-bold text-center mb-10 text-indigo-600">How It Works</h2>
      <div className="text-xl text-gray-800 text-center mb-8 space-y-6">
        <p className="font-semibold">
          Start with <span className="font-extrabold text-indigo-700">100 papers for free.</span>
        </p>
        <ul className="list-disc list-inside text-left inline-block space-y-3">
          <li>Once you exceed the 100 paper limit, submit ₹2000 (23.82 USD) to our platform.</li>
          <li>Add as many papers as you need after payment.</li>
          <li>After the conference ends, our system will generate an invoice.</li>
          <li>Invoice is based on the number of papers submitted and our price slabs. (Given Below)</li>
          <li>Invoice will be sent to your Email ID.</li>
        </ul>
      </div>
      <div className="text-center mt-10">
        <Link href={"/payment-portal"}>
          <Button variant="default" size="lg" className="px-10 py-4 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
            Pay ₹2000
          </Button>
        </Link>
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