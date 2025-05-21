"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

export function ProjectsShowcase() {
  const [activeProject, setActiveProject] = useState<number | null>(null)

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution with integrated payment processing",
      tags: ["Next.js", "Stripe", "Tailwind CSS"],
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "Mobile Banking App",
      description: "Secure and intuitive mobile banking application",
      tags: ["React Native", "Node.js", "Firebase"],
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "AI Content Generator",
      description: "Content creation tool powered by artificial intelligence",
      tags: ["Python", "OpenAI", "React"],
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "Real Estate Platform",
      description: "Property listing and management system",
      tags: ["Next.js", "MongoDB", "Google Maps API"],
      image: "/placeholder.svg?height=600&width=800",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.title}
          className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          onHoverStart={() => setActiveProject(index)}
          onHoverEnd={() => setActiveProject(null)}
          whileHover={{ y: -5 }}
        >
          <div className="relative h-64 overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>

          <div className="relative p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <motion.div
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowUpRight className="h-4 w-4" />
              </motion.div>
            </div>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
