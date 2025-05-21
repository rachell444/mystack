import type React from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

export default function GradientText({ children, className }: GradientTextProps) {
  return (
    <span className={cn("bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400", className)}>
      {children}
    </span>
  )
}
