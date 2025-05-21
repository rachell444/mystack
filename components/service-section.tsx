import type { LucideIcon } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ServiceSectionProps {
  title: string
  icon: string
  services: string[]
  bgColor?: string
  iconColor?: string
  featured?: boolean
}

export default function ServiceSection({ title, icon, services, bgColor = 'bg-gray-900', iconColor = 'text-blue-400', featured = false }: ServiceSectionProps) {
  // Dynamically get the icon component
  const IconComponent = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon

  return (
    <Card className={`${bgColor} border-opacity-30 border-gray-700 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group ${featured ? 'ring-1 ring-blue-500/20' : ''}`}>
      {featured && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
          Featured
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {IconComponent && <IconComponent className={`h-5 w-5 ${iconColor}`} />}
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mt-4">
          {services.map((service, index) => (
            <li key={index} className="flex items-start">
              <div className={`mr-2 mt-1 h-1.5 w-1.5 rounded-full ${iconColor} flex-shrink-0`} />
              <span className="text-gray-300 text-sm">{service}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
