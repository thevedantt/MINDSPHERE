import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-full bg-[#1a1a1a] border border-[#A7C4B5]/20 px-4 py-2 text-sm text-[#F6F5F3] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#C7D9E7]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7C4B5] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
