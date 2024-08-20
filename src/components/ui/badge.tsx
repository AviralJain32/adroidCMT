import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        accepted:"border-transparent bg-green-400 text-black hover:bg-green-400/80",
        submitted:"border-transparent bg-yellow-300 hover:bg-yellow-300/80",
        rejected:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        review:"border-transparent text-white bg-orange-600 hover:bg-orange-400/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "submitted",
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
