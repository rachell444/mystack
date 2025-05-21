"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import GradientText from "@/components/gradient-text"

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState("frontend")

  const categories = [
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "mobile", name: "Mobile" },
    { id: "design", name: "Design" },
    { id: "tools", name: "Tools" },
  ]

  const technologies = {
    frontend: [
      { name: "React", icon: "/placeholder.svg?height=60&width=60", level: 95 },
      { name: "Next.js", icon: "/placeholder.svg?height=60&width=60", level: 90 },
      { name: "TypeScript", icon: "/placeholder.svg?height=60&width=60", level: 85 },
      { name: "Tailwind CSS", icon: "/placeholder.svg?height=60&width=60", level: 95 },
      { name: "Vue.js", icon: "/placeholder.svg?height=60&width=60", level: 80 },
      { name: "Angular", icon: "/placeholder.svg?height=60&width=60", level: 75 },
    ],
    backend: [
      { name: "Node.js", icon: "/placeholder.svg?height=60&width=60", level: 90 },
      { name: "Express", icon: "/placeholder.svg?height=60&width=60", level: 85 },
      { name: "MongoDB", icon: "/placeholder.svg?height=60&width=60", level: 80 },
      { name: "PostgreSQL", icon: "/placeholder.svg?height=60&width=60", level: 85 },
      { name: "GraphQL", icon: "/placeholder.svg?height=60&width=60", level: 75 },
      { name: "Firebase", icon: "/placeholder.svg?height=60&width=60", level: 85 },
    ],
    mobile: [
      { name: "React Native", icon: "/placeholder.svg?height=60&width=60", level: 90 },
      { name: "Flutter", icon: "/placeholder.svg?height=60&width=60", level: 75 },
      { name: "Swift", icon: "/placeholder.svg?height=60&width=60", level: 70 },
      { name: "Kotlin", icon: "/placeholder.svg?height=60&width=60", level: 65 },
    ],
    design: [
      { name: "Figma", icon: "/placeholder.svg?height=60&width=60", level: 85 },
      { name: "Adobe XD", icon: "/placeholder.svg?height=60&width=60", level: 80 },
      { name: "Photoshop", icon: "/placeholder.svg?height=60&width=60", level: 75 },
      { name: "Illustrator", icon: "/placeholder.svg?height=60&width=60", level: 70 },
    ],
    tools: [
      { name: "Git", icon: "/placeholder.svg?height=60&width=60", level: 95 },
      { name: "Docker", icon: "/placeholder.svg?height=60&width=60", level: 85 },
      { name: "AWS", icon: "/placeholder.svg?height=60&width=60", level: 80 },
      { name: "Vercel", icon: "/placeholder.svg?height=60&width=60", level: 90 },
      { name: "GitHub Actions", icon: "/placeholder.svg?height=60&width=60", level: 85 },
      { name: "Jira", icon: "/placeholder.svg?height=60&width=60", level: 80 },
    ],
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <GradientText>My Technology Stack</GradientText>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          The tools and technologies I use to bring your ideas to life
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
              activeCategory === category.id ? "bg-white text-black" : "bg-white/5 text-white hover:bg-white/10",
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        {technologies[activeCategory as keyof typeof technologies].map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col items-center hover:bg-white/10 transition-colors"
          >
            <div className="relative w-12 h-12 mb-3">
              <Image src={tech.icon || "/placeholder.svg"} alt={tech.name} fill className="object-contain" />
            </div>
            <h3 className="text-sm font-medium mb-2">{tech.name}</h3>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${tech.level}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
            <span className="text-xs text-gray-400 mt-1">{tech.level}%</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
