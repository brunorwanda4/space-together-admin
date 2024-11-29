"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginModel, loginModelTypes } from "@/models/auth/login-model";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AtSign } from "lucide-react";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const LoginForm = () => {
  const [seePass, setSeePass] = useState(false);

  const form = useForm<loginModelTypes>({
    resolver: zodResolver(LoginModel),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: loginModelTypes) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="font-semibold text-2xl text-center mb-4">
          Administration Login
        </h2>

        {/* Email Field */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    id="email"
                    {...field}
                    className="ps-9 w-96"
                    placeholder="Email"
                    type="email"
                  />
                  <FormLabel className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <AtSign size={16} aria-hidden="true" />
                  </FormLabel>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    id="password"
                    {...field}
                    className="ps-9 w-96"
                    placeholder="Password"
                    type={seePass ? "text" : "password"}
                  />
                  <FormLabel className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <RiLockPasswordLine size={16} aria-hidden="true" />
                  </FormLabel>
                  <button
                    type="button"
                    onClick={() => setSeePass(!seePass)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground/80"
                  >
                    {seePass ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button type="submit" className="btn btn-info mt-4 w-full">
          Login
        </button>
      </form>
    </Form>
  );
};
