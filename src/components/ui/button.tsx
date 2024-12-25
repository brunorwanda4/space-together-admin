import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "accent" | "ghost" | "success"|"link" | "outline" | "error" | "info" | "warning";
  size?: "xs" |"sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // Map variant and size props to DaisyUI classes
    const baseClass = "btn";
    const variantClass = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      info: "btn-info",
      ghost: "btn-ghost",
      link: "btn-link",
      outline: "btn-outline",
      error: "btn-error",
      warning: "btn-warning",
      success: "btn-success",
    }[variant];

    const sizeClass = {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
    }[size];

    return (
      <Comp
        className={cn(baseClass, variantClass, sizeClass, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
