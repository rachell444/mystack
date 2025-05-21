"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

export function TerminalDemo() {
  const [text, setText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [currentCommand, setCurrentCommand] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isInView = useInView(ref, { once: false, amount: 0.5 })
  
  // Mensajes personalizados para el terminal
  const commands = [
    {
      cmd: "git push origin main 🚀",
      output: [
        "Launching experiences that connect, inspire and scale...",
        "Crafting seamless user experiences...",
        "Optimizing performance and accessibility...",
        "Building the future of digital products...",
        "This is just the beginning."
      ]
    }
  ]

  useEffect(() => {
    // Crear elemento de audio para efectos de sonido
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio('/sounds/key-press.mp3') // Asegúrate de agregar este archivo
      audioRef.current.volume = 0.2
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!isInView) {
      setText("")
      setCurrentCommand(0)
      return
    }
    
    // Habilitar sonido después de interacción del usuario
    const enableSound = () => setSoundEnabled(true)
    window.addEventListener('click', enableSound, { once: true })
    
    const currentText = commands[0].cmd + '\n' + commands[0].output.join('\n')
    
    let i = 0
    const typing = setInterval(() => {
      if (i <= currentText.length) {
        setText(currentText.substring(0, i))
        
        // Reproducir sonido de tecla (pero no para cada carácter, para que no sea abrumador)
        if (soundEnabled && i % 3 === 0 && audioRef.current) {
          // Clonar el audio para permitir múltiples reproducciones simultáneas
          const sound = audioRef.current.cloneNode() as HTMLAudioElement
          sound.volume = 0.1 + Math.random() * 0.1 // Variar ligeramente el volumen
          sound.playbackRate = 0.8 + Math.random() * 0.4 // Variar ligeramente la velocidad
          sound.play().catch(() => {}) // Catch para evitar errores si el navegador bloquea la reproducción
        }
        
        i++
      } else {
        clearInterval(typing)
      }
    }, 40) // Velocidad de escritura ligeramente más rápida

    const cursorBlink = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530) // Velocidad de parpadeo ligeramente irregular para mayor realismo

    return () => {
      clearInterval(typing)
      clearInterval(cursorBlink)
      window.removeEventListener('click', enableSound)
    }
  }, [isInView, soundEnabled])

  return (
    <motion.div
      ref={ref}
      className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-md rounded-xl border border-white/10 p-4 font-mono text-sm overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Gradient background effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 opacity-50 blur-2xl rounded-xl -z-10 animate-pulse" 
           style={{ animationDuration: '8s' }} />
           
      {/* Overlay para efecto CRT */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(rgba(0,0,0,0.05),rgba(0,0,0,0.05)_1px,transparent_1px,transparent_2px)] opacity-10"></div>

      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/30"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/30"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm shadow-green-500/30"></div>
        <div className="flex-1 text-center">
          <div className="ml-2 text-gray-400 text-xs font-bold">~/projects/portfolio</div>
        </div>
      </div>

      {/* Terminal content */}
      <div className="text-green-400 whitespace-pre-line h-[180px] overflow-y-auto">
        <span className="text-blue-400 font-bold">~ </span>
        <span className="text-white">{text}</span>
        {showCursor && <span className="text-white animate-pulse">▎</span>}
      </div>
      
      {/* Silent audio for preloading */}
      {soundEnabled && <audio src="/sounds/key-press.mp3" preload="auto" className="hidden" />}
    </motion.div>
  )
}
