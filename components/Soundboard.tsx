import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Bell, RabbitIcon as Duck, TruckIcon as Trumpet, Bomb } from "lucide-react"
import type React from "react" // Added import for React

interface SoundOption {
  name: string
  icon: React.ElementType
}

const soundOptions: SoundOption[] = [
  { name: "Mute", icon: VolumeX },
  { name: "Beep", icon: Volume2 },
  { name: "Quack", icon: Duck },
  { name: "Honk", icon: Bell },
  { name: "Boom", icon: Bomb },
  { name: "Trumpet", icon: Trumpet },
]

interface SoundboardProps {
  selectedSound: string
  onSelectSound: (sound: string) => void
}

export default function Soundboard({ selectedSound, onSelectSound }: SoundboardProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {soundOptions.map((option) => (
        <Button
          key={option.name}
          variant={selectedSound === option.name ? "default" : "outline"}
          className="flex flex-col items-center justify-center p-2 h-20"
          onClick={() => onSelectSound(option.name)}
        >
          <option.icon className="h-6 w-6 mb-1" />
          <span className="text-xs">{option.name}</span>
        </Button>
      ))}
    </div>
  )
}

