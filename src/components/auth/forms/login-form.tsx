"use client";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginModel, loginModelTypes } from "@/models/auth/login-model";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AtSign } from "lucide-react";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginForm = () => {
  const [seePass, setSeePass] = useState<boolean>(false);

  const handleSeePass = () => {
    setSeePass((state) => !state);
  };

  const form = useForm<loginModelTypes>({
    resolver: zodResolver(LoginModel),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (value: loginModelTypes) => {
    console.log(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <h2 className="font-semibold text-2xl text-center mb-4">
          Administration Login
        </h2>
        <div className="space-y-4">
          {/* Email Field */}
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="group relative">
                <FormControl>
                  <div className="relative">
                    <Input
                      id="input-email"
                      {...field}
                      className="peer ps-9 w-96"
                      placeholder="Email"
                      type="email"
                    />
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                      <AtSign size={16} strokeWidth={2} aria-hidden="true" />
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          {/* Password Field */}
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="group relative">
                <FormControl>
                  <div className="relative">
                    <Input
                      id="input-password"
                      {...field}
                      className="peer ps-9 w-96"
                      placeholder="Password"
                      type={seePass ? "text" : "password"}
                    />
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                      <RiLockPasswordLine
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </div>
                    {/* Toggle Visibility Icon */}
                    <button
                      type="button"
                      onClick={handleSeePass}
                      className="absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80"
                    >
                      {seePass ? (
                        <FiEye size={16} aria-hidden="true" />
                      ) : (
                        <FiEyeOff size={16} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <button className="btn btn-info mt-4 w-full">Login</button>
      </form>
    </Form>
  );
};

export default LoginForm;
