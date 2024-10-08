"use client";

import { loginValidation } from "@/validation/userValidation";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye } from "lucide-react";

export const LoginForm = () => {
  const [showPassword , setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(state => !state);
  }
  const form = useForm<z.infer <typeof loginValidation>>({
    resolver : zodResolver(loginValidation),
    defaultValues : {
      name : "",
      password : "",
    }
  })

  return (
    <Form {...form}>
      <form className=" card w-full">
        <FormField
          name = "name"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>Username or email</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="email@example.com"/>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name = "password"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className=" flex gap-1 relative">
                  <Input {...field} type={showPassword ? "text" : "password"} placeholder="********"/>
                  <button  className=" absolute right-2 top-2" type="button" onClick={handleShowPassword}><Eye /></button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <button type="submit" className=" btn btn-info w-full mt-2">Login</button>
      </form>
    </Form>
  )
}
