"use client"
import { Button } from '@/components/ui/button'
import { HandleCheckoutPayement } from '@/helpers/HandleCheckoutPayement'
import React from 'react'

const PaymentButton = () => {
  return (
    <Button onClick={(e)=>HandleCheckoutPayement(e)} variant="default" size="lg" className="px-10 py-4 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
            Pay ₹2000
    </Button>
  )
}

export default PaymentButton
