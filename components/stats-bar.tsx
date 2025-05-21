"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

// Componente para mostrar números con animación de conteo
type CounterProps = {
  from: number
  to: number
  suffix?: string
  duration?: number
  isInView: boolean
}

function Counter({ from, to, suffix = "", duration = 2, isInView }: CounterProps) {
  const [count, setCount] = useState(from)
  
  useEffect(() => {
    if (!isInView) return
    
    let startTime: number | null = null
    let animationFrame: number
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      // Función de ease-out para que el conteo sea más natural
      const easeOutProgress = 1 - Math.pow(1 - progress, 3)
      
      setCount(Math.floor(from + (to - from) * easeOutProgress))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount)
      }
    }
    
    animationFrame = requestAnimationFrame(updateCount)
    
    return () => cancelAnimationFrame(animationFrame)
  }, [from, to, duration, isInView])
  
  return (
    <span>{count}{suffix}</span>
  )
}

export function StatsBar() {
  const stats = [
    { 
      label: "Projects Completed", 
      value: 40, 
      suffix: "+", 
      gradient: "from-blue-600 via-cyan-400 to-blue-500",
      shadowColor: "shadow-blue-500/20"
    },
    { 
      label: "Client Satisfaction", 
      value: 99, 
      suffix: "%", 
      gradient: "from-violet-600 via-purple-400 to-violet-500",
      shadowColor: "shadow-violet-500/20"
    },
    { 
      label: "Years Experience", 
      value: 3, 
      suffix: "+", 
      gradient: "from-pink-600 via-rose-400 to-pink-500",
      shadowColor: "shadow-pink-500/20"
    },
    { 
      label: "Technologies", 
      value: 22, 
      suffix: "+", 
      gradient: "from-amber-600 via-orange-400 to-amber-500",
      shadowColor: "shadow-amber-500/20"
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const ref = useRef(null)
        const isInView = useInView(ref, { once: true, amount: 0.5 })
        
        return (
          <motion.div
            ref={ref}
            key={stat.label}
            className={`relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center overflow-hidden shadow-lg ${stat.shadowColor}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            {/* Gradient background effect */}
            <div 
              className={`absolute -inset-1 opacity-30 blur-xl ${isInView ? 'animate-pulse' : ''} bg-gradient-to-r ${stat.gradient} rounded-xl -z-10`} 
              style={{ animationDuration: '4s', animationDelay: `${index * 0.2}s` }}
            />
            
            <div className={cn("text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r", stat.gradient)}>
              <Counter 
                from={0} 
                to={stat.value} 
                suffix={stat.suffix} 
                isInView={isInView} 
              />
            </div>
            <div className="text-gray-400">{stat.label}</div>
          </motion.div>
        )
      })}
    </div>
  )
}
