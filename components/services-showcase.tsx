"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import ServiceCard, { getBgColor, getIconBgColor } from "./service-card"
import { Button } from "@/components/ui/button"
import GradientText from "@/components/gradient-text"
import { servicesData } from "@/lib/data"

export function ServicesShowcase() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [filteredServices, setFilteredServices] = useState(servicesData)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  const categories = ["All", "Development", "Design", "Product Management", "Marketing"]

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredServices(servicesData)
    } else {
      setFilteredServices(servicesData.filter((service) => service.category === activeCategory))
    }
  }, [activeCategory])

  const handleServiceClick = (title: string) => {
    setSelectedService(title === selectedService ? null : title)
  }

  const selectedServiceData = servicesData.find((service) => service.title === selectedService)

  // Define the puzzle layout
  // Definimos la interfaz para el tipo de servicio
  interface ServiceType {
    title: string;
    icon: any; // Usamos 'any' para el icono por simplicidad
    description: string;
    fullDescription?: string;
    services: string[];
    technologies?: string[];
    gradient: string;
    category: string;
    featured?: boolean;
  }

  // Función para reordenar los servicios antes de mostrarlos
  const arrangeServicesOrder = (services: ServiceType[]): ServiceType[] => {
    // Encontramos los índices de las tarjetas que queremos reordenar
    const reactDevIndex = services.findIndex((s: ServiceType) => s.title === "React Development");
    const fullStackIndex = services.findIndex((s: ServiceType) => s.title === "Full-Stack Development");
    const productMgmtIndex = services.findIndex((s: ServiceType) => s.title === "Product Management");
    
    if (reactDevIndex !== -1 && fullStackIndex !== -1 && productMgmtIndex !== -1) {
      // Creamos una copia del array
      const arranged = [...services];
      
      // Queremos que Product Management aparezca justo después de Full-Stack Development
      // Primero lo quitamos de su posición actual
      const productMgmt = arranged.splice(productMgmtIndex, 1)[0];
      
      // Lo insertamos después de Full-Stack Development
      const insertPosition = arranged.findIndex((s: ServiceType) => s.title === "Full-Stack Development") + 1;
      arranged.splice(insertPosition, 0, productMgmt);
      
      return arranged;
    }
    
    return services;
  };
  
  // Reordenamos los servicios
  const orderedServices = arrangeServicesOrder(filteredServices);

  const puzzleLayout = [
    // First row - 24 columns total
    { id: 0, colSpan: "col-span-6", rowSpan: "row-span-1", height: "h-[220px]" }, // Small card
    { id: 1, colSpan: "col-span-12", rowSpan: "row-span-1", height: "h-[220px]" }, // Wide card
    { id: 2, colSpan: "col-span-6", rowSpan: "row-span-1", height: "h-[220px]" }, // Small card

    // Second row
    { id: 3, colSpan: "col-span-8", rowSpan: "row-span-1", height: "h-[240px]" }, // Medium card
    { id: 4, colSpan: "col-span-8", rowSpan: "row-span-1", height: "h-[300px]" }, // React Development (reducido)
    { id: 5, colSpan: "col-span-8", rowSpan: "row-span-1", height: "h-[240px]" }, // Medium card

    // Third row
    { id: 6, colSpan: "col-span-8", rowSpan: "row-span-1", height: "h-[280px]" }, // Full-Stack Development (más alto)
    { id: 7, colSpan: "col-span-8", rowSpan: "row-span-1", height: "h-[240px]" }, // Product Management
    { id: 8, colSpan: "col-span-8", rowSpan: "row-span-1", height: "h-[280px]" }, // Database Design (más alto)

    // Fourth row
    { id: 9, colSpan: "col-span-10", rowSpan: "row-span-1", height: "h-[220px]" }, // Medium-wide card
    { id: 10, colSpan: "col-span-4", rowSpan: "row-span-1", height: "h-[220px]" }, // Extra small card
    { id: 11, colSpan: "col-span-10", rowSpan: "row-span-1", height: "h-[220px]" }, // Medium-wide card

    // Fifth row
    { id: 12, colSpan: "col-span-6", rowSpan: "row-span-1", height: "h-[220px]" }, // Small card
    { id: 13, colSpan: "col-span-12", rowSpan: "row-span-1", height: "h-[220px]" }, // Wide card
    { id: 14, colSpan: "col-span-6", rowSpan: "row-span-1", height: "h-[220px]" }, // Small card
  ]

  return (
    <div ref={containerRef} className="relative">
      {/* Category Filter */}
      <div className="mb-10 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2 pb-2 min-w-max">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              className={cn(
                "rounded-full px-6 py-2 text-sm transition-all duration-300",
                activeCategory === category
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-white",
              )}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Services Grid with Puzzle Layout */}
      <div className="grid grid-cols-24 gap-4 md:gap-6 mb-12">
        {orderedServices.slice(0, puzzleLayout.length).map((service: ServiceType, index: number) => {
          // Get layout info for this service
          const layoutInfo = puzzleLayout[index % puzzleLayout.length]

          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={cn("transition-all duration-500", layoutInfo.colSpan, layoutInfo.rowSpan)}
            >
              <div onClick={() => handleServiceClick(service.title)} className="cursor-pointer h-full">
                <ServiceCard
                  title={service.title}
                  icon={service.icon}
                  description={service.description}
                  services={service.services}
                  gradient={service.gradient}
                  featured={service.featured}
                  customHeight={layoutInfo.height}
                  size={getSizeFromLayout(layoutInfo)}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && selectedServiceData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-4xl max-h-[80vh] overflow-auto border border-white/20 rounded-2xl p-6"
              style={{ backgroundColor: getBgColor(selectedServiceData.gradient) }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <div
                    className={cn("p-3 rounded-lg w-fit mb-4 flex items-center justify-center")}
                    style={{ backgroundColor: getIconBgColor(selectedServiceData.gradient) }}
                  >
                    <selectedServiceData.icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">
                    <GradientText>{selectedServiceData.title}</GradientText>
                  </h2>
                  <p className="text-gray-300 mb-6">
                    {selectedServiceData.fullDescription || selectedServiceData.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedServiceData.technologies?.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6">Request Service</Button>
                </div>

                <div className="md:w-1/2">
                  <h3 className="text-xl font-semibold mb-4">What I Offer</h3>
                  <ul className="space-y-4">
                    {selectedServiceData.services.map((service, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start p-3 rounded-lg"
                        style={{ backgroundColor: getBgColor(selectedServiceData.gradient) }}
                      >
                        <div
                          className={cn(
                            "mr-3 mt-1 p-1 rounded-full flex-shrink-0"
                          )}
                          style={{ backgroundColor: getIconBgColor(selectedServiceData.gradient) }}
                        >
                          <Plus className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-gray-200">{service}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skills Visualization */}
      <SkillsVisualization />
    </div>
  )
}

// Helper function to determine size based on layout info
function getSizeFromLayout(layoutInfo: { colSpan: string; rowSpan: string; height: string }) {
  if (layoutInfo.colSpan === "col-span-12" || layoutInfo.colSpan === "col-span-10") {
    return "wide"
  } else if (layoutInfo.colSpan === "col-span-8") {
    if (layoutInfo.rowSpan === "row-span-2") {
      return "tall"
    }
    return "medium"
  } else if (layoutInfo.colSpan === "col-span-6") {
    return "small"
  } else if (layoutInfo.colSpan === "col-span-4") {
    return "xsmall"
  } else {
    return "small"
  }
}

function SkillsVisualization() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [activeSkill, setActiveSkill] = useState<number | null>(null)

  const skills = [
    {
      name: "Frontend",
      level: 95,
      color: "from-blue-500 to-cyan-500",
      technologies: ["React", "Next.js", "Vue", "HTML/CSS", "JavaScript"],
    },
    {
      name: "Backend",
      level: 90,
      color: "from-violet-500 to-purple-500",
      technologies: ["Node.js", "Express", "Python", "PHP", "SQL"],
    },
    {
      name: "Mobile",
      level: 85,
      color: "from-pink-500 to-rose-500",
      technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
    },
    {
      name: "DevOps",
      level: 80,
      color: "from-amber-500 to-orange-500",
      technologies: ["Docker", "Kubernetes", "CI/CD", "AWS", "Vercel"],
    },
    {
      name: "Design",
      level: 75,
      color: "from-emerald-500 to-green-500",
      technologies: ["Figma", "Adobe XD", "Photoshop", "Illustrator"],
    },
  ]

  return (
    <div ref={containerRef} className="mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <GradientText>Technical Expertise</GradientText>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Core skills and technologies I've mastered over the years
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
              onMouseEnter={() => setActiveSkill(index)}
              onMouseLeave={() => setActiveSkill(null)}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span className="text-gray-400">{skill.level}%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={cn("h-full bg-gradient-to-r rounded-full", skill.color)}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>

              <AnimatePresence>
                {activeSkill === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute mt-2 left-0 right-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3 z-10"
                  >
                    <div className="flex flex-wrap gap-2">
                      {skill.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-white/10 rounded-full text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="relative h-[400px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <SkillsRadarChart skills={skills} isInView={isInView} />
          </div>
        </div>
      </div>
    </div>
  )
}

function SkillsRadarChart({ skills, isInView }: { skills: any[]; isInView: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [size, setSize] = useState({ width: 300, height: 300 })

  useEffect(() => {
    const updateSize = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement
        if (container) {
          const width = container.clientWidth
          const height = container.clientHeight
          setSize({ width, height })
          canvasRef.current.width = width
          canvasRef.current.height = height
        }
      }
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !isInView) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const centerX = size.width / 2
    const centerY = size.height / 2
    const radius = Math.min(centerX, centerY) * 0.8

    // Clear canvas
    ctx.clearRect(0, 0, size.width, size.height)

    // Draw radar background
    const levels = 5
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)"

    for (let i = 1; i <= levels; i++) {
      ctx.beginPath()
      const levelRadius = (radius * i) / levels
      ctx.arc(centerX, centerY, levelRadius, 0, Math.PI * 2)
      ctx.stroke()
      ctx.fill()
    }

    // Draw axes
    const angleStep = (Math.PI * 2) / skills.length
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"

    skills.forEach((_, i) => {
      const angle = i * angleStep - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
      ctx.stroke()
    })

    // Draw skill data
    ctx.fillStyle = "rgba(59, 130, 246, 0.2)"
    ctx.strokeStyle = "rgba(59, 130, 246, 0.8)"
    ctx.lineWidth = 2
    ctx.beginPath()

    skills.forEach((skill, i) => {
      const angle = i * angleStep - Math.PI / 2
      const skillRadius = (radius * skill.level) / 100
      const x = centerX + Math.cos(angle) * skillRadius
      const y = centerY + Math.sin(angle) * skillRadius

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Draw skill points
    skills.forEach((skill, i) => {
      const angle = i * angleStep - Math.PI / 2
      const skillRadius = (radius * skill.level) / 100
      const x = centerX + Math.cos(angle) * skillRadius
      const y = centerY + Math.sin(angle) * skillRadius

      // Draw point
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = "white"
      ctx.fill()

      // Draw label
      ctx.fillStyle = "white"
      ctx.font = "12px Inter, sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const labelRadius = radius + 20
      const labelX = centerX + Math.cos(angle) * labelRadius
      const labelY = centerY + Math.sin(angle) * labelRadius

      ctx.fillText(skill.name, labelX, labelY)
    })
  }, [skills, size, isInView])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
