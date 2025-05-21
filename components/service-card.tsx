"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  title: string
  icon: LucideIcon
  description: string
  services: string[]
  gradient: string
  featured?: boolean
  size?: "xsmall" | "small" | "medium" | "wide" | "tall"
  customHeight?: string
}

// Helper functions for getting colors and styles based on gradient and category
function getCategoryFromGradient(gradient: string): "Development" | "Design" | "Product Management" | "Marketing" {
  // Development (azules)
  if (gradient.includes('blue') || gradient.includes('cyan') || gradient.includes('sky') || gradient.includes('indigo')) {
    return "Development"
  }
  // Design (morados)
  if (gradient.includes('purple') || gradient.includes('violet') || gradient.includes('fuchsia') || gradient.includes('pink')) {
    return "Design"
  }
  // Product Management (verdes)
  if (gradient.includes('green') || gradient.includes('emerald')) {
    return "Product Management"
  }
  // Marketing (naranjas)
  if (gradient.includes('orange') || gradient.includes('amber') || gradient.includes('yellow')) {
    return "Marketing"
  }
  
  return "Development" // Default
}

export function getBgColor(gradient: string): string {
  const category = getCategoryFromGradient(gradient)
  const colorMap: Record<string, string> = {
    "Development": '#111827',
    "Design": '#1e1b2e',
    "Product Management": '#11291e',
    "Marketing": '#291811',
  }
  return colorMap[category] || '#111827'
}

function getBorderColor(gradient: string, isHovered: boolean): string {
  // Usamos el mismo color para todos para imitar la imagen de referencia
  return isHovered ? 'rgba(55, 65, 81, 0.7)' : 'rgba(55, 65, 81, 0.3)'
}

function getShadowColor(): string {
  // Usamos una sombra muy suave para todas las tarjetas
  return 'rgba(0, 0, 0, 0.2)'
}

export function getIconBgColor(gradient: string): string {
  const category = getCategoryFromGradient(gradient)
  const colorMap: Record<string, string> = {
    "Development": '#3b82f6',     // Azul
    "Design": '#a855f7',        // Morado
    "Product Management": '#22c55e',  // Verde
    "Marketing": '#f97316',       // Naranja
  }
  return colorMap[category] || '#3b82f6'
}

function getTagBgColor(gradient: string): string {
  // Color de fondo para etiquetas basado en la imagen de referencia
  return 'rgba(75, 85, 99, 0.3)'
}

function getTagTextColor(gradient: string): string {
  // Todas las etiquetas tienen el mismo color de texto según la imagen de referencia
  return '#f3f4f6'
}

export default function ServiceCard({
  title,
  icon: Icon,
  description,
  services,
  gradient,
  featured = false,
  size = "small",
  customHeight,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Determine how many services to show based on card size
  const getServicesToShow = () => {
    switch (size) {
      case "xsmall":
        return 1
      case "small":
        return 2
      case "medium":
        return 3
      case "wide":
        return 3
      case "tall":
        return 5
      default:
        return 2
    }
  }

  const servicesToShow = getServicesToShow()

  // Adjust padding based on size
  const getPaddingClass = () => {
    switch (size) {
      case "xsmall":
        return "p-4"
      case "small":
        return "p-5"
      case "medium":
        return "p-6"
      case "wide":
        return "p-6"
      case "tall":
        return "p-6"
      default:
        return "p-5"
    }
  }

  // Adjust title size based on card size
  const getTitleClass = () => {
    switch (size) {
      case "xsmall":
        return "text-base"
      case "small":
        return "text-lg"
      case "medium":
        return "text-xl"
      case "wide":
        return "text-xl"
      case "tall":
        return "text-2xl"
      default:
        return "text-lg"
    }
  }

  // Get icon size based on card size
  const getIconSize = () => {
    switch (size) {
      case "xsmall":
        return "h-3.5 w-3.5"
      case "small":
        return "h-4 w-4"
      case "medium":
        return "h-5 w-5"
      case "wide":
        return "h-5 w-5"
      case "tall":
        return "h-6 w-6"
      default:
        return "h-4 w-4"
    }
  }

  // Get icon container size based on card size
  const getIconContainerClass = () => {
    switch (size) {
      case "xsmall":
        return "p-1"
      case "small":
        return "p-1.5"
      case "medium":
        return "p-2"
      case "wide":
        return "p-2"
      case "tall":
        return "p-2.5"
      default:
        return "p-1.5"
    }
  }

  // Get description text size
  const getDescriptionClass = () => {
    switch (size) {
      case "xsmall":
        return "text-xs line-clamp-2"
      case "small":
        return "text-xs line-clamp-2"
      case "medium":
        return "text-sm line-clamp-2"
      case "wide":
        return "text-sm line-clamp-2"
      case "tall":
        return "text-sm line-clamp-3"
      default:
        return "text-xs line-clamp-2"
    }
  }

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden group transition-all duration-300 h-full rounded-xl", 
        getPaddingClass(),
        customHeight,
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5, transition: { duration: 0.4 } }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: getBgColor(gradient),
        border: `1px solid ${getBorderColor(gradient, isHovered)}`,
        boxShadow: isHovered ? `0 8px 20px -8px rgba(0, 0, 0, 0.25)` : 'none'
      }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
        <div className={cn("h-full w-full bg-gradient-to-br", gradient)} />
      </div>

      {/* Subtle glow effect for featured cards */}
      {featured && (
        <div
          className={cn(
            "absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10",
            gradient,
          )}
        />
      )}

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-3">
          <div
            className={cn(
              "rounded-xl flex items-center justify-center",
              getIconContainerClass(),
            )}
            style={{
              backgroundColor: getIconBgColor(gradient)
            }}
          >
            <Icon className={cn("text-white", getIconSize())} />
          </div>
          <h3 className={cn("font-semibold", getTitleClass())}>{title}</h3>

          {/* Featured badge */}
          {featured && size !== "xsmall" && (
            <div className="ml-auto px-2.5 py-0.5 text-xs font-medium rounded-full border border-gray-700 bg-gray-800" 
              style={{
                color: getTagTextColor(gradient)
              }}>
              Featured
            </div>
          )}
        </div>

        <p className={cn("text-gray-400 mb-3", getDescriptionClass())}>{description}</p>

        <ul className="space-y-1.5 flex-grow">
          {services.slice(0, servicesToShow).map((service, index) => (
            <motion.li
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isHovered ? 1 : 0.7, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div 
                className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" 
                style={{ backgroundColor: getIconBgColor(gradient) }}
              />
              <span className="text-gray-300 text-xs">{service}</span>
            </motion.li>
          ))}
          {services.length > servicesToShow && (
            <motion.li
              className="text-xs text-gray-400 pl-4 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0.7 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              +{services.length - servicesToShow} more services
            </motion.li>
          )}
        </ul>

        {/* View details button */}
        <motion.div
          className="mt-3 text-xs font-medium flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span 
            className="px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors hidden"
            style={{ 
              background: getTagBgColor(gradient),
              color: getTagTextColor(gradient)
            }}
          >
            View details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}
