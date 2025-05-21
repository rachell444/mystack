"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Code, Rocket, ArrowRight, CheckCircle, Clock, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import GradientText from "@/components/gradient-text"

export function WorkMethodology() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: "Discovery & Planning",
      icon: Search,
      color: "from-blue-500 to-cyan-500",
      description: "Understanding your vision and defining the technical roadmap",
      details: [
        {
          title: "Requirements Analysis",
          description: "In-depth analysis of your business needs and technical requirements",
          icon: CheckCircle,
        },
        {
          title: "Timeline Planning",
          description: "Creating a realistic timeline with clear milestones and deliverables",
          icon: Clock,
        },
        {
          title: "Stakeholder Alignment",
          description: "Ensuring all stakeholders are aligned on project goals and expectations",
          icon: Users,
        },
      ],
    },
    {
      title: "Development & Testing",
      icon: Code,
      color: "from-violet-500 to-purple-500",
      description: "Building your solution with a focus on quality and performance",
      details: [
        {
          title: "Agile Development",
          description: "Iterative development with regular updates and continuous integration",
          icon: CheckCircle,
        },
        {
          title: "Quality Assurance",
          description: "Comprehensive testing to ensure functionality, performance, and security",
          icon: Clock,
        },
        {
          title: "Collaborative Feedback",
          description: "Regular demos and feedback sessions to ensure alignment with your vision",
          icon: Users,
        },
      ],
    },
    {
      title: "Deployment & Growth",
      icon: Rocket,
      color: "from-pink-500 to-rose-500",
      description: "Launching your project and providing ongoing support for growth",
      details: [
        {
          title: "Seamless Deployment",
          description: "Smooth deployment process with minimal downtime and disruption",
          icon: CheckCircle,
        },
        {
          title: "Knowledge Transfer",
          description: "Comprehensive documentation and training for your team",
          icon: Clock,
        },
        {
          title: "Continuous Improvement",
          description: "Ongoing support and optimization to help your project grow and evolve",
          icon: Users,
        },
      ],
    },
  ]

  return (
    <div className="relative">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <GradientText>My Work Methodology</GradientText>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          A structured approach designed to deliver exceptional results for your technical projects
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Steps Navigation */}
        <div className="flex flex-col gap-4 flex-1 max-w-full lg:max-w-[420px]">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className={cn(
                "p-5 rounded-xl border transition-all duration-300 cursor-pointer h-full flex-1",
                activeStep === index
                  ? "bg-white/10 border-white/20 shadow-lg"
                  : "bg-white/5 border-white/10 hover:bg-white/8",
              )}
              onClick={() => setActiveStep(index)}
              whileHover={{ x: activeStep === index ? 0 : 5 }}
            >
              <div className="flex items-start gap-4">
                <div className={cn("p-2.5 rounded-lg bg-gradient-to-br flex-shrink-0 mt-1", step.color)}>
                  <step.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
                {activeStep === index && (
                  <div className="ml-auto">
                    <ArrowRight className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Step Details */}
        <div className="flex-1 flex flex-col h-full">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col h-full justify-between"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={cn("p-3 rounded-lg bg-gradient-to-br", steps[activeStep].color)}>
                {React.createElement(steps[activeStep].icon, { className: "h-6 w-6 text-white" })}
              </div>
              <h3 className="text-2xl font-bold">{steps[activeStep].title}</h3>
            </div>

            <div className="space-y-6">
              {steps[activeStep].details.map((detail, index) => (
                <motion.div
                  key={detail.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex gap-4 bg-white/5 rounded-xl p-4"
                >
                  <div className="mt-1 flex-shrink-0">
                    <detail.icon className="h-5 w-5 text-white/70" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{detail.title}</h4>
                    <p className="text-gray-400 text-sm">{detail.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  Step {activeStep + 1} of {steps.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveStep((prev) => (prev === 0 ? prev : prev - 1))}
                    disabled={activeStep === 0}
                    className={cn(
                      "p-2 rounded-full border border-white/10",
                      activeStep === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-white/10",
                    )}
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                  </button>
                  <button
                    onClick={() => setActiveStep((prev) => (prev === steps.length - 1 ? prev : prev + 1))}
                    disabled={activeStep === steps.length - 1}
                    className={cn(
                      "p-2 rounded-full border border-white/10",
                      activeStep === steps.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-white/10",
                    )}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
