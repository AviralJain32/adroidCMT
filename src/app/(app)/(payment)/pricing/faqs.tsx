import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  export function Faqs() {
    const faqsList = [
      {
        ques: "What does the 'Small Size Conference' plan include?",
        ans: "The 'Small Size Conference' plan allows you to submit up to 100 papers for free. This plan is ideal for smaller events or conferences just starting out, offering basic features to manage your conference efficiently without any cost.",
      },
      {
        ques: "What happens when I exceed 100 papers?",
        ans: "Once you exceed the 100 paper limit, you'll need to submit $50 to our platform to access the 'Unlimited Plan.' This plan allows you to add as many papers as you need, with additional costs per paper according to the pricing tiers.",
      },
      {
        ques: "How is the invoice generated?",
        ans: "After your conference concludes, our system will automatically generate an invoice based on the total number of papers submitted and the corresponding pricing plan. The invoice will include the base cost and any additional charges per paper.",
      },
      {
        ques: "Can I switch plans after starting a conference?",
        ans: "Yes, you can switch from the 'Small Size Conference' plan to the 'Unlimited Plan' at any time. The transition is seamless, and you will only need to submit $50 to activate the unlimited paper submission option.",
      },
      {
        ques: "What support is provided with the 'Unlimited Plan'?",
        ans: "The 'Unlimited Plan' includes priority support, ensuring that any issues or questions are addressed promptly. Additionally, you'll have access to a dedicated account manager who will assist you throughout your conference.",
      },
      {
        ques: "Are there any hidden fees?",
        ans: "No, There is no hidden fees for first 100 papers.", //The pricing is transparent, and all costs are clearly outlined in the pricing plan descriptions and the final invoice.
      },
      {
        ques: "How do I get started with my conference?",
        ans: "Getting started is easy! Choose the 'Small Size Conference' plan to begin with 100 free papers, or opt for the 'Unlimited Plan' if you anticipate needing more. You can start adding papers and managing your conference immediately after selecting your plan.",
      },
      {
        ques: "What payment methods are accepted?",
        ans: "We accept multiple payment options, including American Express, Mastercard, and Visa. Specific details will be shared during the payment process.",
      },
      {
        ques: "Can I customize my conference features?",
        ans: "Yes, the 'Unlimited Plan' offers customizable features tailored to your specific needs. Contact us to discuss your requirements, and we’ll help set up the features that best suit your conference.",
      },
      {
        ques: "What if I need more support during my conference?",
        ans: "We are here to help! If you need additional support, you can reach out to our customer service team at any time. For those on the 'Unlimited Plan,' you will have priority access to our support team.",
      },
    ];
  
    return (
      <Accordion type="single" collapsible className="w-full">
        {faqsList.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.ques}</AccordionTrigger>
            <AccordionContent>{faq.ans}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }
  