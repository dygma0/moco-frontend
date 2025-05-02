import { ReactNode } from 'react'

interface IconProps {
  id: string
  title: string
  children: ReactNode
  size?: number
  className?: string
  stroke?: string
  strokeWidth?: number
}

export function Icon({ 
  id, 
  title, 
  children, 
  size = 18, 
  className = "text-[#888]",
  stroke = "currentColor",
  strokeWidth = 2
}: IconProps) {
  return (
    <span className={className}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={stroke} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        aria-hidden="true" 
        aria-labelledby={id}
      >
        <title id={id}>{title}</title>
        {children}
      </svg>
    </span>
  )
}
