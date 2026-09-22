import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 rounded-md",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground rounded-md",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 rounded-md",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-md",
        link: "text-primary underline-offset-4 hover:underline",
        // Persona 5 Console Game Variants:
        p5: "relative px-8 py-3.5 bg-white text-black font-p5Heading text-2xl tracking-widest uppercase border-[3.5px] border-black shadow-[6px_6px_0px_#000000] -skew-x-6 transition-all duration-150 ease-out hover:bg-p5-crimson hover:text-white hover:border-black hover:shadow-[10px_10px_0px_#000000] hover:translate-x-6 hover:scale-105 active:scale-95 cursor-pointer select-none",
        p5Menu: "relative w-[360px] min-h-[64px] px-8 py-3.5 bg-white text-black font-p5Heading text-2xl md:text-3xl tracking-widest uppercase border-4 border-black shadow-[8px_8px_0px_#000000] -skew-x-6 transition-all duration-200 ease-out hover:bg-p5-crimson hover:text-white hover:border-black hover:shadow-[14px_14px_0px_#000000] hover:translate-x-8 hover:scale-[1.06] active:scale-95 cursor-pointer select-none flex items-center justify-between",
        p5Action: "relative px-6 py-2.5 bg-black text-white font-p5Heading text-xl tracking-wider uppercase border-2 border-white shadow-[4px_4px_0px_#E60012] -skew-x-6 transition-all duration-150 hover:bg-p5-crimson hover:border-black hover:shadow-[6px_6px_0px_#000000] hover:scale-105 active:scale-95 cursor-pointer",
        p5Close: "px-4 py-2 bg-p5-crimson text-white font-p5Heading text-lg uppercase border-2 border-black shadow-[4px_4px_0px_#000000] -skew-x-6 hover:bg-white hover:text-black hover:scale-105 transition-all cursor-pointer"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        p5: "h-auto py-3.5 px-8",
        p5Lg: "h-auto py-4 px-10",
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
