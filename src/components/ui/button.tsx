"use client";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils/clsx";
import Link from "next/link";

const buttonVariants = tv({
  variants: {
    variant: {
      // Default variants
      default: "bg-emerald-600 text-white hover:bg-emerald-700",
      "default-red": "bg-red-600 text-white hover:bg-red-700",
      "default-blue": "bg-blue-600 text-white hover:bg-blue-700",
      "default-purple": "bg-purple-600 text-white hover:bg-purple-700",

      // Outline variants
      outline: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
      "outline-emerald": "border border-emerald-600 text-emerald-700 hover:bg-emerald-50",
      "outline-red": "border border-red-600 text-red-700 hover:bg-red-50",
      "outline-blue": "border border-blue-600 text-blue-700 hover:bg-blue-50",
      "outline-purple": "border border-purple-600 text-purple-700 hover:bg-purple-50",

      // Ghost variants
      ghost: "hover:bg-gray-200/50 hover:text-gray-900 bg-transparent",
      "ghost-emerald": "hover:bg-emerald-50 hover:text-emerald-900 bg-transparent",
      "ghost-red": "hover:bg-red-50 hover:text-red-900 bg-transparent",
      "ghost-blue": "hover:bg-blue-50 hover:text-blue-900 bg-transparent",
      "ghost-purple": "hover:bg-purple-50 hover:text-purple-900 bg-transparent",

      // Link variants
      link: "text-emerald-600 underline-offset-4 hover:underline bg-transparent shadow-none",
      "link-red": "text-red-600 underline-offset-4 hover:underline bg-transparent shadow-none",
      "link-blue": "text-blue-600 underline-offset-4 hover:underline bg-transparent shadow-none",

      // Destructive / Secondary / Transparent / Faded
      destructive: "bg-red-600 text-white hover:bg-red-700",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      transparent: "bg-transparent text-gray-700 hover:bg-gray-50/50",
      faded: "bg-gray-100/50 text-gray-600 hover:bg-gray-100/70 opacity-70",
    },
    size: {
      sm: "h-[36px] px-3 text-sm",
      md: "h-10 px-5 text-sm",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10 p-0 text-base",
      max: "w-max h-max"
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
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
  showRipple?: boolean
  shouldScale?: boolean
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
  showRipple = false,
  shouldScale = false,
  ...props
}: ButtonProps<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonProps<C>>) => {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const [isPressed, setIsPressed] = React.useState(false);
  const rippleKey = React.useRef(0);

  const Component: React.ElementType = href ? Link : component ?? (asChild ? "div" : "button");

  // Global mouse up handler - reset scale 
  React.useEffect(() => {
    if (isPressed && shouldScale) {
      const handleGlobalMouseUp = () => setIsPressed(false)
      window.addEventListener("mouseup", handleGlobalMouseUp);
      return () => window.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [isPressed, shouldScale]);

  // Mouse down handler  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (shouldScale) setIsPressed(true)
    if (props.onMouseDown) props.onMouseDown(e);
  };

  // Mouse up handler
  const handleMouseUp = (e: React.MouseEvent) => {
    if (shouldScale) setIsPressed(false)
    if (props.onMouseUp) props.onMouseUp(e);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const key = rippleKey.current++;

    setRipples((prev) => [...prev, { x, y, key }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.key !== key)), 500);
  };


  return (
    <Component
      className={cn(
        "relative overflow-hidden cursor-pointer",
        "relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium outline-none",
        "ease duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring !transition-all",
        "focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden px-[30px]",
        buttonVariants({ variant, size, className }),
      )}
      style={{
        transform: shouldScale && isPressed ? "scale(0.90)" : "scale(1)",
        transition: "transform 0.1s ease-out",
        ...props.style,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
      href={href}
    >
      {children}

      {showRipple && ripples.map((ripple) => (
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
