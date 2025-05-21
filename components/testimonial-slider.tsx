"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function TestimonialSlider() {
  const [current, setCurrent] = useState(0)

  const testimonials = [
    {
      quote:
        "Working with DevExpert was a game-changer for our business. The attention to detail and technical expertise exceeded our expectations.",
      author: "Sarah Johnson",
      role: "CEO, TechStart",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "The mobile app developed for our company has received outstanding feedback from our users. The UI is intuitive and performance is excellent.",
      author: "Michael Chen",
      role: "Product Manager, MobileFirst",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "Our website's performance and SEO improved dramatically after working with DevExpert. The technical knowledge and problem-solving skills are top-notch.",
      author: "Emma Rodriguez",
      role: "Marketing Director, GrowthHub",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10"
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 text-5xl">"</div>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 italic">{testimonials[current].quote}</p>
            <div className="flex items-center">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={testimonials[current].avatar || "/placeholder.svg"}
                  alt={testimonials[current].author}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <div className="font-semibold">{testimonials[current].author}</div>
                <div className="text-gray-400 text-sm">{testimonials[current].role}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              current === index ? "bg-white" : "bg-white/30"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
