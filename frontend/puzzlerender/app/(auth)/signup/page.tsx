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
    first_name: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    last_name: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
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
        path: ["password2"],
        message: "Passwords do not match.",
      });
    }
  });

export default function SignupPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password1: "",
      password2: "",
    },
  });

  const router = useRouter();
  const API_URL = "http://127.0.0.1:8000";


  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { first_name, last_name, email, username, password1, password2 } = values;

    try {
      const response = await axios.post(`${API_URL}/signup/`, {
        first_name,
        last_name,
        email,
        username,
        password1,
        password2,
      });

      if (response.status === 201) {
        toast.success("Signup successful!");
        console.log("Signup successful!");
        router.push("/dashboard");
      } else {
        toast.error("Signup failed.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errors = error.response?.data.errors;
  
        if (errors) {
          // Display only the error messages without the keys
          for (const messages of Object.values(errors)) {
            (messages as string[]).forEach((message) => {
              toast.error(message);
            });
          }
        } else {
          toast.error(error.response?.data?.error || "An error occurred");
        }
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
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your first name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your last name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <Input type="password" placeholder="password" {...field} />
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
                      <Input type="password" placeholder="confirm password" {...field} />
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
