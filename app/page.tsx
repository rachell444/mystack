"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import GradientText from "@/components/gradient-text"
import { BackgroundGrid } from "@/components/background-grid"
import { NavMenu } from "@/components/nav-menu"
import { TerminalDemo } from "@/components/terminal-demo"
import { StatsBar } from "@/components/stats-bar"
import { ProjectsShowcase } from "@/components/projects-showcase"
import { ContactForm } from "@/components/contact-form"
import { ServicesShowcase } from "@/components/services-showcase"

// Import the new components
import { LanguageSwitcher } from "@/components/language-switcher"
import { WorkMethodology } from "@/components/work-methodology"
import { ModernHero } from "@/components/modern-hero"
import { MainNavigation } from "@/components/nav-menu"

export default function Home() {
  const { scrollYProgress } = useScroll()
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <BackgroundGrid />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 py-5">
        <div className="container mx-auto px-4">
          <MainNavigation />
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <ModernHero />

        {/* Stats Section */}
        <section className="py-20 border-t border-white/10">
          <div className="container mx-auto px-4">
            <StatsBar />
          </div>
        </section>

        {/* Terminal Demo */}
        <section className="py-20 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <TerminalDemo />
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="py-20 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                <GradientText>Expert Services</GradientText>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Specialized technical solutions tailored to your business needs
              </p>
            </div>

            <ServicesShowcase />
          </div>
        </section>

        {/* Projects Showcase */}
        <section id="projects" className="py-20 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                <GradientText>Featured Projects</GradientText>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                A selection of my recent work across various technologies
              </p>
            </div>

            <ProjectsShowcase />
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 border-t border-white/10">
          <div className="container mx-auto px-4">
            <WorkMethodology />
          </div>
        </section>

        {/* Tech Stack Section (Replacing Testimonials) */}
        <section className="py-20 border-t border-white/10">
          <div className="container mx-auto px-4">
            
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    <GradientText>Ready to Start Your Project?</GradientText>
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    Let's discuss how I can help bring your ideas to life with tailored technical solutions.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Phone</h3>
                        <p className="text-gray-400">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Email</h3>
                        <p className="text-gray-400">hello@devexpert.com</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">DevExpert</span>
              </div>
              <p className="text-gray-400 mt-2">Transforming ideas into digital solutions</p>
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                LinkedIn
              </Link>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} DevExpert. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
