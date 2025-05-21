"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export function NavMenu({ className = "" }: { className?: string }) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const menuItems = [
    { name: "Features", href: "#features" },
    { name: "How it works", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Partners", href: "#partners" },
  ]

  return (
    <div className={`${className} flex items-center`}>
      <nav className="bg-[#1c1c2c]/70 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/5">
        <ul className="flex space-x-6">
          {menuItems.map((item) => (
            <li key={item.name} className="relative mx-1">
              <Link
                href={item.href}
                className="text-sm text-gray-300 hover:text-white px-2 py-1.5 inline-block transition-colors"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.name}
                <AnimatePresence>
                  {hoveredItem === item.name && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-white/40"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export function MainNavigation() {
  return (
    <div className="flex w-full items-center justify-between">
      {/* Logo */}
      <Link href="/" className="relative z-10">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
          C
        </div>
      </Link>
      
      {/* Center nav */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <NavMenu />
      </div>
      
      {/* Action button */}
      <Link 
        href="#contact" 
        className="relative z-10 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-purple-500/20"
      >
        Start now
      </Link>
    </div>
  )
}
