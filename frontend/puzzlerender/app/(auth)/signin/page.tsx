"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

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
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z
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
  });

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();
  // const API_URL = "http://137.184.102.24";
  const API_URL = "http://127.0.0.1:8000";

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { username, password } = values;
    setLoading(true); // Set loading to true when the form is submitted

    try {
      const response = await axios.post(`${API_URL}/signin/`, {
        username,
        password,
      });

      if (response.status === 200) {
        const { access, refresh } = response.data;

        // Set the tokens as cookies
        Cookies.set("access", access, { expires: 1 }); // Expires in 1 day
        Cookies.set("refresh", refresh, { expires: 7 });

        router.push("/dashboard");
        toast.success("Login successful!");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errors = error.response?.data.errors;

        if (errors) {
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
    } finally {
      setLoading(false); // Set loading to false when the process is finished
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <div>
        <h2 className="text-xl font-bold text-center">LOGO</h2>
        <p className="text-3xl font-semibold">Login</p>
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="your@mail.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your username.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
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
              <Button
                type="submit"
                variant="default"
                className="w-full p-6 bg-federal flex justify-center items-center"
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  <div style={{
                    border: '4px solid #f3f3f3', /* Light grey */
                    borderTop: '4px solid #3498db', /* Blue */
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    animation: 'spin 1s linear infinite'
                  }} />
                ) : (
                  "Submit"
                )}
                <style jsx>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
              </Button>
            </form>
          </Form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
