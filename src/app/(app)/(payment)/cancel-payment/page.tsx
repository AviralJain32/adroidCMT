import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const PaymentCancel = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          Oops! <span className="text-4xl">😞</span>
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          It looks like your payment was canceled. No worries, you can always
          try again.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          If you need any assistance or have questions, feel free to contact our
          support team.
        </p>

        <Link href="/pricing">
          <Button className="bg-red-500 text-white py-2 px-6 rounded-lg font-medium text-lg hover:bg-red-600 transition duration-300 ease-in-out">
            Go Back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;
