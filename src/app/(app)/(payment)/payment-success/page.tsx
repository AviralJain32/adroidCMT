import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <h1 className="text-4xl font-bold text-green-500 mb-4">
          Payment Successful! 🎉
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Thank you for your payment. A receipt has been sent to your registered
          email address.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Please check your inbox for the details of your transaction.
        </p>

        <Link href="/">
          <Button className="bg-green-500 text-white py-2 px-6 rounded-lg font-medium text-lg hover:bg-green-600 transition duration-300 ease-in-out">
            Go to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
