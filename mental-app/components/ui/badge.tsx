import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-[#A7C4B5] to-[#CAB8FF] text-[#2B2B2B] shadow-sm",
        secondary:
          "border-transparent bg-[#A7C4B5]/20 text-[#A7C4B5] border-[#A7C4B5]/30",
        destructive:
          "border-transparent bg-red-500 text-white shadow-sm hover:bg-red-600",
        outline: "text-[#F6F5F3] border-[#A7C4B5]/30 bg-[#1a1a1a]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
