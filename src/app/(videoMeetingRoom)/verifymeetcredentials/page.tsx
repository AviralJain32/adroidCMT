"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  meeting_id: z.string().trim().uuid("Not a valid meeting ID"),
  meeting_password: z.string().min(6, "Password should be at least 6 characters"),
});

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meeting_id: "",
      meeting_password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post("/api/meetings/set-cookie-and-verify-person", values);
      console.log(response)
      if (response.status === 200) {
        toast({
          title: "Success!",
          description: "You have successfully joined the meeting.",
          variant: "default",
        });
        router.push(response.data.data.join_link);
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to join the meeting. Please check your details and try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex min-h-screen min-w-full justify-center items-center">
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Join Meeting</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="meeting_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meeting_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter Password" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the password for the meeting sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Join Meeting</Button>
        </form>
      </Form>
    </div>
    </div>
  );
};

export default Page;