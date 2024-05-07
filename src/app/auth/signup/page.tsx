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
import { signupSchema } from "@/lib/types";
import type { TSignUpSchema } from "@/lib/types";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: TSignUpSchema) => {
    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });

      console.error("Passwords do not match");

      return;
    }

    console.log(data);

    localStorage.setItem("user", JSON.stringify(data));

    router.push("/auth/signin");

    return;
  };

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="bg-secondary bg-cover bg-center w-[25vw] rounded-2xl shadow-lg shadow-orange-100 text-black">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>Confirm Password</FormLabel>
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
              Sign up
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
