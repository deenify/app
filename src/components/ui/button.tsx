"use client";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";
import Link from "next/link";

const buttonVariants = tv({
  base: cn(
    "relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium outline-none",
    "ease duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring !transition-all",
    "focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden px-[30px]"
  ),
  variants: {
    variant: {
      default: "bg-primary-900 text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground bg-transparent",
      link: "text-primary underline-offset-4 hover:underline bg-transparent shadow-none",
      faded: "text-gray-700 hover:bg-gray-100"
    },
    size: {
      sm: "h-8 px-3 text-sm",
      default: "h-10 px-5 text-base",
      lg: "h-12 px-6 text-lg",
      icon: "h-10 w-10 p-0 text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps<C extends React.ElementType = "button">
  extends VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  children: React.ReactNode;
  className?: string;
  component?: C;
  rippleClassName?: string
  rippleGoesFast?: boolean
}

interface Ripple {
  x: number;
  y: number;
  key: number;
}

export const Button = <C extends React.ElementType = "button">({
  asChild,
  href,
  component,
  variant,
  size,
  className,
  children,
  rippleClassName,
  rippleGoesFast = false,
  ...props
}: ButtonProps<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonProps<C>>) => {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const rippleKey = React.useRef(0);

  const Component: React.ElementType = href ? Link : component ?? (asChild ? "span" : "button");

  const handleMouseUp = (e: React.MouseEvent) => {
    if (props.onMouseUp) props.onMouseUp(e);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const key = rippleKey.current++;

    setRipples((prev) => [...prev, { x, y, key }]);

    // remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.key !== key));
    }, 500);
  };

  return (
    <Component
      className={cn(
        "active:scale-95 transition-transform duration-150 ease-out relative overflow-hidden",
        buttonVariants({ variant, size, className }),
      )}
      onMouseDown={props.onMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
      href={href}
    >
      {children}

      {ripples.map((ripple) => (
        <span
          key={ripple.key}
          className={cn(
            "absolute w-5 h-5 bg-white/30 rounded-full pointer-events-none",
            rippleGoesFast ? "animate-ripple-4" : "animate-ripple-8",
            rippleClassName
          )}
          style={{ top: ripple.y - 10, left: ripple.x - 10, }}
        />
      ))}
    </Component>
  );
};
