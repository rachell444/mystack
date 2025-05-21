"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { motion } from "framer-motion"

export function ModernHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              DevExpert
            </div>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>

          {/* Right Side Items */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button 
              variant="outline" 
              className="hidden md:flex border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 rounded-full px-6"
            >
              Create Account
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="relative text-sm text-gray-300 hover:text-white transition-colors group"
    >
      {children}
      <motion.div
        className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"
        whileHover={{ width: "100%" }}
      />
    </Link>
  )
}
