"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const formSchema = z
  .object({
    email: z.string().email({
      message: "Username must be at least 2 characters.",
    }),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password1: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/\d/, { message: "Password must contain at least one digit." })
      .regex(/[\W_]/, {
        message: "Password must contain at least one special character.",
      }),
    password2: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password1 !== data.password2) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordConfirm"],
        message: "Passwords do not match.",
      });
    }
  });
// first name, last name, username, email, password, confirm password

export default function SignupPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password1: "",
      password2: "",
    },
  });

  const router = useRouter();
  // const API_URL = "http://137.184.102.24"
  const API_URL = "http://127.0.0.1:8000"

  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/gettoken/`)
      .then((response) => {
        setCsrfToken(response.data.csrfToken);
      })
      .catch((error) => {
        console.error('Error fetching CSRF token:', error);
      });
  }, []);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, username, password1, password2 } = values;

    try {
      const response = await axios.post(`${API_URL}/accounts/signup/`, {
        email,
        username,
        password1,
        password2,
      });

      if (response.status === 200) {
        // router.push("/dashboard");
        toast.success("Signup successful!");
        console.log("Signup successful!");
      } else {
        toast.error("");
      }
    } catch (error) {
      // Handle errors, e.g., display a notification to the user
      // console.error("Login failed", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        toast.error(error.response?.data?.error || "An error occurred");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
      }
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <div>
        <h2 className="text-xl font-bold text-center mt-24">LOGO</h2>
        <p className="text-3xl font-semibold">SignUp</p>
      </div>
      <div className="flex flex-col items-center justify-center w-7/12 min-h-[50vh]">
        <div className="w-full h-full flex items-center justify-center bg-lightcyan rounded-lg border border-federal shadow-xl p-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@mail.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your email address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="yourusername" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="password" {...field} />
                    </FormControl>
                    <FormDescription>This is your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="confirm password" {...field} />
                    </FormControl>
                    <FormDescription>Confirm your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="default"
                className="w-full p-6 bg-federal"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
