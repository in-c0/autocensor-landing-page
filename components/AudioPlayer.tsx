"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import WaveSurfer from "wavesurfer.js"
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.js"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AudioPlayerProps {
  audioSrc: string
  censoredSegments: Array<{ start: number; end: number; type: string }>
  onTimeUpdate: (time: number) => void
}

export default function AudioPlayer({ audioSrc, censoredSegments, onTimeUpdate }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [useFallback, setUseFallback] = useState(false)
  const wavesurferRef = useRef<WaveSurfer | null>(null)
  const regionsPluginRef = useRef<RegionsPlugin | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const regionsRef = useRef<Map<string, any>>(new Map())

  const getColorForType = useCallback((type: string) => {
    const colors: { [key: string]: string } = {
      profanity: "rgba(239, 68, 68, 0.3)",
      toxicity: "rgba(245, 158, 11, 0.3)",
      obscene: "rgba(139, 92, 246, 0.3)",
      threat: "rgba(16, 185, 129, 0.3)",
      insult: "rgba(99, 102, 241, 0.3)",
      identity_attack: "rgba(236, 72, 153, 0.3)",
      sexual_explicit: "rgba(244, 63, 94, 0.3)",
    }
    return colors[type] || "rgba(156, 163, 175, 0.3)"
  }, [])

  const handlePlayPause = useCallback(() => {
    if (useFallback && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error)
          setLoadError(`Failed to play audio: ${error.message}`)
        })
      }
    } else if (wavesurferRef.current) {
      wavesurferRef.current.playPause()
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying, useFallback])

  const handleSkip = useCallback(
    (direction: "forward" | "backward") => {
      const skipAmount = 2
      if (useFallback && audioRef.current) {
        audioRef.current.currentTime += direction === "forward" ? skipAmount : -skipAmount
      } else if (wavesurferRef.current) {
        const currentTime = wavesurferRef.current.getCurrentTime()
        wavesurferRef.current.setTime(currentTime + (direction === "forward" ? skipAmount : -skipAmount))
      }
    },
    [useFallback],
  )

  const handleVolumeChange = useCallback(
    (newVolume: number[]) => {
      const volumeValue = newVolume[0]
      setVolume(volumeValue)
      if (useFallback && audioRef.current) {
        audioRef.current.volume = volumeValue
      } else if (wavesurferRef.current) {
        wavesurferRef.current.setVolume(volumeValue)
      }
    },
    [useFallback],
  )

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }, [])

  const handleTimeUpdate = useCallback(
    (currentTime: number) => {
      setCurrentTime(currentTime)
      onTimeUpdate(currentTime)
    },
    [onTimeUpdate],
  )

  useEffect(() => {
    if (!audioSrc || !containerRef.current) {
      setLoadError("No audio source or container provided.")
      setUseFallback(true)
      return
    }

    const initWaveSurfer = async () => {
      try {
        // Create regions plugin instance
        const regionsPlugin = RegionsPlugin.create()
        regionsPluginRef.current = regionsPlugin

        // Initialize WaveSurfer with the regions plugin
        const wavesurfer = WaveSurfer.create({
          container: containerRef.current!,
          waveColor: "#4F46E5",
          progressColor: "#818CF8",
          cursorColor: "#3730A3",
          height: 80,
          url: audioSrc,
          plugins: [regionsPlugin],
        })

        // Set up event listeners
        wavesurfer.on("ready", () => {
          setDuration(wavesurfer.getDuration())
          wavesurferRef.current = wavesurfer

          // Add regions after the waveform is ready
          if (regionsPlugin) {
            censoredSegments.forEach((segment, index) => {
              const region = regionsPlugin.addRegion({
                start: segment.start,
                end: segment.end,
                color: getColorForType(segment.type),
                drag: false,
                resize: false,
              })
              regionsRef.current.set(`region-${index}`, region)
            })
          }
        })

        wavesurfer.on("timeupdate", (currentTime) => {
          handleTimeUpdate(currentTime)
        })

        wavesurfer.on("play", () => setIsPlaying(true))
        wavesurfer.on("pause", () => setIsPlaying(false))
        wavesurfer.on("error", (error) => {
          console.error("WaveSurfer error:", error)
          setLoadError(`Failed to load audio: ${error}`)
          setUseFallback(true)
        })

        // Enable interaction to play/pause
        wavesurfer.on("interaction", () => {
          wavesurfer.playPause()
        })

        wavesurferRef.current = wavesurfer
      } catch (error) {
        console.error("Error initializing WaveSurfer:", error)
        setLoadError(`Failed to initialize audio player: ${error}`)
        setUseFallback(true)
      }
    }

    initWaveSurfer()

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy()
      }
    }
  }, [audioSrc, censoredSegments, getColorForType, handleTimeUpdate])

  if (!audioSrc) {
    return <div>No audio source provided</div>
  }

  return (
    <div className="mb-6 space-y-4">
      {loadError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {loadError}</span>
        </div>
      )}
      {!useFallback && (
        <>
          <div ref={containerRef} className="touch-none" />
          <div className="flex flex-wrap gap-2 mt-2">
            {censoredSegments.map((segment, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="h-4 w-4 rounded cursor-pointer"
                      style={{ backgroundColor: getColorForType(segment.type) }}
                      onClick={() => {
                        if (wavesurferRef.current) {
                          wavesurferRef.current.setTime(segment.start)
                        }
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {segment.type} at {formatTime(segment.start)}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button onClick={() => handleSkip("backward")} variant="outline" size="icon" className="touch-manipulation">
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button onClick={handlePlayPause} variant="outline" size="icon" className="touch-manipulation">
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button onClick={() => handleSkip("forward")} variant="outline" size="icon" className="touch-manipulation">
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
        <span className="text-sm">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <Volume2 className="h-4 w-4" />
        <Slider value={[volume]} onValueChange={handleVolumeChange} max={1} step={0.01} className="w-32 touch-none" />
      </div>
      {useFallback && (
        <div className="mt-4">
          <p className="text-sm text-yellow-500 mb-2">Using fallback audio player:</p>
          <audio
            ref={audioRef}
            src={audioSrc}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={(e) => handleTimeUpdate(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onError={(e) => {
              console.error("Audio error:", e)
              setLoadError(`Failed to load audio: ${e.currentTarget.error?.message || "Unknown error"}`)
            }}
            controls
          />
        </div>
      )}
    </div>
  )
}

