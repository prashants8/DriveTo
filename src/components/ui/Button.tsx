import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm',
      secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50',
      outline: 'bg-transparent border border-indigo-600 text-indigo-600 hover:bg-indigo-50',
      ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
      danger: 'bg-red-600 text-white hover:bg-red-700',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg font-medium',
      icon: 'p-2',
    }

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none font-medium outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
