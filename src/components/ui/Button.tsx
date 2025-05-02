import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

export function Button({ 
  children, 
  variant = 'outline', 
  size = 'md', 
  className = '', 
  onClick, 
  type = 'button',
  disabled = false,
  icon,
  iconPosition = 'left'
}: ButtonProps) {
  const baseClassName = "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0"
  
  const variantClassNames = {
    primary: "bg-[#c28b3b] hover:bg-[#a67a2e] text-white",
    secondary: "bg-[#f8f8f6] hover:bg-[#eaeaea] text-[#333]",
    outline: "border border-[#e0e0e0] bg-background hover:bg-accent hover:text-accent-foreground text-[#666]"
  }
  
  const sizeClassNames = {
    sm: "rounded-md text-xs h-8 px-3 [&_svg]:size-3.5",
    md: "rounded-md text-sm h-9 px-4 [&_svg]:size-4",
    lg: "rounded-md text-base h-10 px-5 [&_svg]:size-5"
  }
  
  return (
    <button
      type={type}
      className={`${baseClassName} ${variantClassNames[variant]} ${sizeClassNames[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  )
}
