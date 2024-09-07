import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { TiTick } from "react-icons/ti";
import { motion } from "framer-motion"
interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  tagline:string
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  buttonText,
  tagline
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-500 transform hover:scale-105 ease-in">
      <CardHeader className="p-6 rounded-t-xl">
        <CardTitle className="text-3xl">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center px-8">
        <div className="text-3xl font-extrabold">{price}</div>
        <div className='mb-6 my-2 font-bold'>{tagline}</div>
        <ul className="space-y-2 text-gray-700">
          {features.map((feature, index) => (
            <li key={index} className="text-md ">
              <div className='flex gap-2'>
              <TiTick className='mt-1 text-green-600'/>
              {feature}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      {/* <CardFooter className="flex justify-center p-8">
        <Button variant="default" size="lg" className="w-full text-lg font-semibold py-4">
          {buttonText}
        </Button>
      </CardFooter> */}
    </Card>
  );
};

export default PricingCard;
