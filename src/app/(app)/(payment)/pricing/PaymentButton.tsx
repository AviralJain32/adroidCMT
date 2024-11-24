"use client"
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import {handleCheckoutPayment} from "@/helpers/HandleCheckoutPayement"
import React from 'react'

const PaymentButton = () => {

  const {toast} = useToast()
  const CheckoutPayement=async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    const response=await handleCheckoutPayment(e)
    console.log(response)
    toast({
      title: 'Error',
      description: `${response.error}` || "Failed to reset password.",
      variant: 'destructive',
    })
  }
  return (
    <Button onClick={(e)=>CheckoutPayement(e)} variant="default" size="lg" className="px-10 py-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
            Pay $50
    </Button>
  )
}

export default PaymentButton
