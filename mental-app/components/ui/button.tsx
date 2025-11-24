import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-[#FFB38E] text-[#2B2B2B] hover:bg-[#FF9D6E] shadow-lg font-semibold",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-[#A7C4B5]/30 bg-[#1a1a1a] text-[#F6F5F3] hover:bg-[#252525] hover:border-[#A7C4B5]/50",
        secondary: "bg-[#A7C4B5]/20 text-[#A7C4B5] hover:bg-[#A7C4B5]/30 border border-[#A7C4B5]/20",
        ghost: "hover:bg-[#1a1a1a] text-[#F6F5F3]",
        link: "text-[#CAB8FF] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-full px-3",
        lg: "h-11 rounded-full px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
