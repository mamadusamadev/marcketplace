"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative">
      {/* Main Image */}
      <div
        className={cn(
          "relative aspect-square overflow-hidden rounded-lg bg-muted",
          isZoomed ? "cursor-zoom-out" : "cursor-zoom-in",
        )}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img
          src={images[activeIndex] || "/placeholder.svg"}
          alt="Produto"
          className={cn(
            "h-full w-full object-cover transition-transform duration-300",
            isZoomed ? "scale-150" : "scale-100",
          )}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 bg-background/80 hover:bg-background/90"
          onClick={(e) => {
            e.stopPropagation()
            setIsZoomed(!isZoomed)
          }}
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
        onClick={prevImage}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
        onClick={nextImage}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Thumbnails */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "h-20 w-20 shrink-0 overflow-hidden rounded-md border-2",
              activeIndex === index ? "border-emerald-500" : "border-transparent",
            )}
            onClick={() => setActiveIndex(index)}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
