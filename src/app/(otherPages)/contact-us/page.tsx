// // ContactUsPage.tsx
// "use client";

// import { useForm } from 'react-hook-form';
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import { toast } from '@/components/ui/use-toast';
// import { Phone, Mail, MessageSquare } from 'lucide-react'; // Icons for contact options
// import Link from 'next/link';

// type ContactFormValues = {
//     name: string;
//     email: string;
//     message: string;
// };

// const ContactUsPage = () => {
//     const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>();

//     const onSubmit = async (data: ContactFormValues) => {
//         try {
//             const response = await fetch('/api/contact', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (response.ok) {
//                 toast({
//                     title: "Message Sent!",
//                     description: "We have received your message. We'll get back to you shortly.",
//                 });
//                 reset(); // Reset the form after successful submission
//             } else {
//                 toast({
//                     title: "Error",
//                     description: "There was a problem sending your message. Please try again later.",
//                     variant: "destructive",
//                 });
//             }
//         } catch (error) {
//             toast({
//                 title: "Error",
//                 description: "Something went wrong. Please try again later.",
//                 variant: "destructive",
//             });
//         }
//     };

//     return (
//         <div className="min-h-[80vh] py-10 px-4 bg-gray-50">
//             <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-2 items-start">
//                 {/* Contact Form Section */}
//                 <Card className="shadow-lg p-6 bg-white">
//                     <CardHeader>
//                         <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                             <div>
//                                 <label htmlFor="name" className="block font-medium">Your Name</label>
//                                 <Input
//                                     id="name"
//                                     placeholder="Enter your name"
//                                     {...register("name", { required: "Name is required" })}
//                                     className="mt-1"
//                                 />
//                                 {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
//                             </div>

//                             <div>
//                                 <label htmlFor="email" className="block font-medium">Your Email</label>
//                                 <Input
//                                     id="email"
//                                     type="email"
//                                     placeholder="Enter your email"
//                                     {...register("email", {
//                                         required: "Email is required",
//                                         pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" }
//                                     })}
//                                     className="mt-1"
//                                 />
//                                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//                             </div>

//                             <div>
//                                 <label htmlFor="message" className="block font-medium">Your Message</label>
//                                 <Textarea
//                                     id="message"
//                                     placeholder="Write your message..."
//                                     {...register("message", { required: "Message is required" })}
//                                     className="mt-1"
//                                 />
//                                 {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
//                             </div>

//                             <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
//                                 Send Message
//                             </Button>
//                         </form>
//                     </CardContent>
//                     <CardFooter>
//                         <p className="text-sm text-gray-500">We will get back to you within 24 hours.</p>
//                     </CardFooter>
//                 </Card>

//                 {/* Contact Details Section */}
//                 <div className="space-y-6">
//                     {/* <div className="bg-white shadow-lg rounded-lg p-6">
//                         <div className="flex items-center space-x-3">
//                             <Phone className="text-green-500 w-6 h-6" />
//                             <h3 className="text-lg font-semibold">Phone Support</h3>
//                         </div>
//                         <p className="mt-2 text-gray-600">For immediate assistance, call us at:</p>
//                         <p className="mt-1 font-bold text-blue-500">+1 234 567 890</p>
//                     </div> */}

//                     <div className="bg-white shadow-lg rounded-lg p-6">
//                         <div className="flex items-center space-x-3">
//                             <Mail className="text-yellow-500 w-6 h-6" />
//                             <h3 className="text-lg font-semibold">Email Support</h3>
//                         </div>
//                         <p className="mt-2 text-gray-600">Reach out to us via email at:</p>
//                         <Link href={"mailto:support@adroidcms.com"} className="mt-1 font-bold text-blue-500">support@adroidcms.com</Link>
//                     </div>

//                     {/* <div className="bg-white shadow-lg rounded-lg p-6">
//                         <div className="flex items-center space-x-3">
//                             <MessageSquare className="text-blue-500 w-6 h-6" />
//                             <h3 className="text-lg font-semibold">WhatsApp Support</h3>
//                         </div>
//                         <p className="mt-2 text-gray-600">Chat with us on WhatsApp at:</p>
//                         <p className="mt-1 font-bold text-blue-500">+1 234 567 891</p>
//                     </div> */}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ContactUsPage;

'use client';

import { useForm } from 'react-hook-form';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Mail } from 'lucide-react'; // Icons for contact options
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils'; // Assuming cn utility is in your utils file
import { sendContactUsMail } from './sendContactMail';

// Zod validation schema
const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Enter a valid email' }),
  message: z.string().min(1, { message: 'Message is required' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactUsPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await sendContactUsMail(
        data.email,
        data.name,
        data.message,
      );

      if (response.success) {
        toast({
          title: 'Message Sent!',
          description:
            "We have received your message. We'll get back to you shortly.",
        });
        reset(); // Reset the form after successful submission
      } else {
        toast({
          title: 'Error',
          description:
            'There was a problem sending your message. Please try again later.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-[80vh] py-10 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-2 items-start">
        {/* Contact Form Section */}
        <Card className="shadow-lg p-6 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block font-medium">
                  Your Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  {...register('name')}
                  className="mt-1"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block font-medium">
                  Your Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  className="mt-1"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block font-medium">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Write your message..."
                  {...register('message')}
                  className="mt-1"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className={cn(
                  'w-full bg-blue-500 hover:bg-blue-600 text-white',
                )}
              >
                Send Message
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">
              We will get back to you within 24 hours.
            </p>
          </CardFooter>
        </Card>

        {/* Contact Details Section */}
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <Mail className="text-yellow-500 w-6 h-6" />
              <h3 className="text-lg font-semibold">Email Support</h3>
            </div>
            <p className="mt-2 text-gray-600">Reach out to us via email at:</p>
            <Link
              href="mailto:support@adroidcms.com"
              className="mt-1 font-bold text-blue-500"
            >
              support@adroidcms.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
