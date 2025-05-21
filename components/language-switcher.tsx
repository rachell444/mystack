"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const [language, setLanguage] = useState<"en" | "es">("en")
  const [isOpen, setIsOpen] = useState(false)

  const toggleLanguage = (lang: "en" | "es") => {
    setLanguage(lang)
    setIsOpen(false)
    // In a real implementation, you would update the app's language context here
  }

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium uppercase">{language}</span>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden z-50"
        >
          <div className="py-1">
            <button
              onClick={() => toggleLanguage("en")}
              className={cn(
                "w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors",
                language === "en" && "bg-white/10",
              )}
            >
              English
            </button>
            <button
              onClick={() => toggleLanguage("es")}
              className={cn(
                "w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors",
                language === "es" && "bg-white/10",
              )}
            >
              Español
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
