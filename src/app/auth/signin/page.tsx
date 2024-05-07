"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signinSchema } from "@/lib/types";
import type { TSignInSchema } from "@/lib/types";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const form = useForm<TSignInSchema>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSignin = async (data: TSignInSchema) => {
    console.log("Sign in form submitted");

    console.log(data);

    const user = localStorage.getItem("user");

    if (!user) {
      form.setError("email", {
        type: "manual",
        message: "User does not exist in database",
      });
      console.error("User not found");
      return;
    }

    const parsedUser = JSON.parse(user);

    if (parsedUser.email !== data.email) {
      form.setError("email", {
        type: "manual",
        message: "Email does not exist in database",
      });
      console.error("Email not found");
      return;
    }

    if (parsedUser.password !== data.password) {
      form.setError("password", {
        type: "manual",
        message: "Password does not match the email provided",
      });
      console.error("Password not found");
      return;
    }

    console.log("User signed in");

    router.push("/qa");

    return;
  };

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="bg-secondary bg-cover bg-center w-[25vw] rounded-2xl shadow-lg shadow-orange-100 text-black">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSignin)}
            className="p-6 rounded-xl font-mono font"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute inset-y-0 right-0 pr-2 flex items-center"
                      >
                        {showPassword ? (
                          <IconEyeOff size={20} />
                        ) : (
                          <IconEye size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full mt-4 font-bold text-black"
              disabled={form.formState.isSubmitting}
            >
              Sign In
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
