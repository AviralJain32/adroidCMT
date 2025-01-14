"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Suspense, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter, useSearchParams } from "next/navigation"
import axios,{AxiosError} from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Country }  from 'country-state-city';
import { CompleteProfileSchema } from "@/schemas/CompleteProfileSchema"

const CompleteProfile = () => {
  const [profileDetails,setProfileDetails]=useState<{email:string,fullname:string} | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)


  const { toast } = useToast()
  const router = useRouter()
  const params=useSearchParams()
  const email=params.get("email")

  useEffect(()=>{
    const fetchUserDetails=async()=>{
      try {
        const response=await axios.get(`/api/complete-profile?email=${email}`)
        setProfileDetails(response.data.data)
      } catch (error:any) {
        console.log(error.response.data.message)
      }
    } 
    fetchUserDetails()
  },[])

  // zod implementation
  const form = useForm<z.infer<typeof CompleteProfileSchema>>({
    resolver: zodResolver(CompleteProfileSchema)
  })
  const onSubmit = async (data: z.infer<typeof CompleteProfileSchema>) => {
    setIsSubmitting(true)
    console.log(data)
    try {
      const response = await axios.patch<ApiResponse>('/api/complete-profile', {...data,email:profileDetails?.email})
      toast({
        title: "Success",
        description: response.data.message
      })
      router.replace(`/dashboard`)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Signup Failed",
        description: axiosError.response?.data.message,
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-400 p-6">
      <div className="w-full max-w-2xl p-10 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight lg:text-5xl mb-2">
          Complete your profile to get started
          </h1>
          {/* <p className="text-gray-600"></p> */}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
          <FormLabel>Name</FormLabel>
          <Input readOnly value={profileDetails?.fullname} className="bg-gray-200" />
          </div>
          <div>
          <FormLabel>Email</FormLabel>
          <Input readOnly value={profileDetails?.email} className="bg-gray-200" />
          </div>
            <FormField
              name="contactNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your contact number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="affilation"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Affiliation</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Organization/Company Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="country"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger >
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Country.getAllCountries().map((country)=>(<SelectItem key={country.name} value={country.name}>{country.name}</SelectItem>))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-blue-600 text-white" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                </>
              ) : ('Continue')}
            </Button>
          </form>
        </Form>
        
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompleteProfile />
    </Suspense>
  );
}



