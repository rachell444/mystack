"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpRight, ChevronDown, Code, Paintbrush, Server, CpuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define tech icons and their positions
const FEATURED_TECH = [
  { 
    name: "React", 
    icon: "/tech/react.svg", 
    position: "top-1/4 -left-4 md:left-16",
    value: "19.345"
  },
  { 
    name: "TypeScript", 
    icon: "/tech/typescript.svg", 
    position: "top-1/3 -right-4 md:right-16", 
    value: "18.345"
  },
  { 
    name: "Next.js", 
    icon: "/tech/nextjs.svg", 
    position: "bottom-1/3 -left-4 md:left-20", 
    value: "17.345"
  },
  { 
    name: "Figma", 
    icon: "/tech/figma.svg", 
    position: "bottom-1/4 -right-4 md:right-20", 
    value: "16.345"
  },
];

// Tech stack for the marquee
const TECH_STACK = [
  { name: "React", logo: "/tech/react.svg" },
  { name: "Next.js", logo: "/tech/nextjs.svg" },
  { name: "TypeScript", logo: "/tech/typescript.svg" },
  { name: "Tailwind CSS", logo: "/tech/tailwind.svg" },
  { name: "Node.js", logo: "/tech/nodejs.svg" },
  { name: "Firebase", logo: "/tech/firebase.svg" },
  { name: "Flutter", logo: "/tech/flutter.svg" },
  { name: "Figma", logo: "/tech/figma.svg" },
  { name: "Docker", logo: "/tech/docker.svg" },
  { name: "GitHub", logo: "/tech/github.svg" },
  { name: "Vercel", logo: "/tech/vercel.svg" },
  { name: "Netlify", logo: "/tech/netlify.svg" }
];

export function ModernHero() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const firstChild = marquee.children[0];
    if (!firstChild) return;

    // Clone the first child and append it
    const clone = firstChild.cloneNode(true);
    marquee.appendChild(clone);

    // Add animation class
    marquee.classList.add('animate-marquee');
  }, []);

  return (
    <motion.section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0A0B1A]">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 w-[900px] h-[600px] bg-[radial-gradient(circle,#4B2C7D_0%,transparent_70%)] opacity-40 blur-3xl"></div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Top badge */}
        <div className="flex justify-center mb-12">
          <div className="px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-white/80">
            Ignite the Potential of Your Projects →
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-[1200px] mx-auto relative">
          {/* Left side tech node */}
          <div className="absolute left-0 top-20 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/50"></div>
            <div className="h-[1px] w-24 bg-gradient-to-r from-white/50 to-transparent"></div>
            <div className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm">
              <span className="text-white/50">Cortex</span>
              <span className="ml-2 text-white/30">20.345</span>
            </div>
          </div>

          {/* Right side tech node */}
          <div className="absolute right-0 top-10 flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm">
              <span className="text-white/50">Quant</span>
              <span className="ml-2 text-white/30">19.345</span>
            </div>
            <div className="h-[1px] w-24 bg-gradient-to-l from-white/50 to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-white/50"></div>
          </div>

          {/* Title */}
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              <div className="inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Your End-to-End</span>
              </div>
              <br />
              <div className="inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white/80 to-white/60">Digital Product</span>
              </div>
              <br />
              <div className="inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white/60 to-white/40">Partner</span>
              </div>
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              Where great ideas are transformed into transcendent digital experiences.
              <br className="hidden md:block" />
              Explore how I design, code, and create products that inspire and connect.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div 
            className="flex justify-center gap-4 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link 
              href="#projects" 
              className="flex items-center gap-2 bg-black border border-white/10 text-white rounded-full px-6 py-2.5 hover:bg-black/80 transition-all shadow-lg shadow-purple-900/10"
            >
              <span>Open App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link 
              href="#features" 
              className="flex items-center bg-white text-black rounded-full px-6 py-2.5 hover:bg-gray-100 transition-all shadow-lg shadow-white/20"
            >
              <span>Discover More</span>
            </Link>
          </motion.div>

          {/* Tech nodes */}
          <motion.div 
            className="absolute left-16 bottom-4 md:bottom-20 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 border border-white/20">
              <Code className="w-3 h-3 text-blue-400" />
            </div>
            <div className="h-[1px] w-24 bg-gradient-to-r from-white/50 to-transparent"></div>
            <div className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm">
              <span className="text-white/50">React</span>
              <span className="ml-2 text-blue-400/70">v18.2</span>
            </div>
          </motion.div>

          <motion.div 
            className="absolute right-16 bottom-4 md:bottom-20 flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm">
              <span className="text-white/50">TypeScript</span>
              <span className="ml-2 text-blue-400/70">v5.0</span>
            </div>
            <div className="h-[1px] w-24 bg-gradient-to-l from-white/50 to-transparent"></div>
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 border border-white/20">
              <CpuIcon className="w-3 h-3 text-blue-400" />
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute left-24 bottom-24 md:bottom-40 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 border border-white/20">
              <Server className="w-3 h-3 text-purple-400" />
            </div>
            <div className="h-[1px] w-24 bg-gradient-to-r from-white/50 to-transparent"></div>
            <div className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm">
              <span className="text-white/50">Next.js</span>
              <span className="ml-2 text-purple-400/70">v14</span>
            </div>
          </motion.div>

          <motion.div 
            className="absolute right-24 bottom-24 md:bottom-40 flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <div className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm">
              <span className="text-white/50">Figma</span>
              <span className="ml-2 text-pink-400/70">Design</span>
            </div>
            <div className="h-[1px] w-24 bg-gradient-to-l from-white/50 to-transparent"></div>
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 border border-white/20">
              <Paintbrush className="w-3 h-3 text-pink-400" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-8 flex items-center gap-2 text-white/50 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <ChevronDown className="w-4 h-4" />
        <span>02/03. Scroll down</span>
      </motion.div>

      {/* DeFi horizons */}
      <motion.div 
        className="absolute bottom-8 right-8 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="text-white/50 text-sm">DeFi horizons</span>
        <div className="w-12 h-[2px] bg-white/20 rounded-full">
          <div className="w-1/3 h-full bg-white/50 rounded-full"></div>
        </div>
      </motion.div>

      {/* Partners/Tech Stack Marquee */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#090920]/90 via-transparent to-[#090920]/90 border-t border-white/5 py-8 overflow-hidden backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-10 md:mb-6">
            <div className="h-px w-10 bg-white/10 self-center mr-4"></div>
            <div className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm text-xs text-white/40 border border-white/5">
              Technologies & Skills
            </div>
            <div className="h-px w-10 bg-white/10 self-center ml-4"></div>
          </div>
        </div>
        
        <div 
          ref={marqueeRef}
          className="flex whitespace-nowrap tech-marquee"
        >
          <div className="flex space-x-16 px-6">
            {TECH_STACK.map((tech, index) => (
              <div key={index} className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                <div className="tech-logo-float w-8 h-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                  <img src={tech.logo} alt={tech.name} className="max-w-full max-h-full" style={{animationDelay: `${index * 0.2}s`}} />
                </div>
              </div>
            ))}
            {TECH_STACK.map((tech, index) => (
              <div key={`copy-${index}`} className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                <div className="tech-logo-float w-8 h-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                  <img src={tech.logo} alt={tech.name} className="max-w-full max-h-full" style={{animationDelay: `${index * 0.2}s`}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
