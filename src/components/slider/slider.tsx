import { useEffect, useRef, useState } from "react"
import { SliderProps } from "./type"

import styles from './slider.module.scss'
import { ArrowBack, ArrowForward } from "@mui/icons-material"

export const Slider: React.FC<SliderProps> = ({ content, isAutoplay }) => {
  const sliderContent = content

  const [currentSlide, setCurrentSlide] = useState(0)

  const sliderRef = useRef<HTMLDivElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    if(content.length > 0) {
      setCurrentSlide(currentSlide === content.length - 1 ? 0 : currentSlide + 1)
    }
  }

  const previousSlide = () => {
    if(content.length > 0) {
      setCurrentSlide(currentSlide === 0? content.length - 1 : currentSlide - 1)
    }
  }

  const startInterval = () => {
    intervalRef.current = setInterval(nextSlide, 3000)
  }

  const stopInterval = () => {
    if(intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    if(content.length > 0 && isAutoplay) {
      startInterval()
    }

    const handleMouseEnter = () => {
      stopInterval()
    }

    const handleMouseLeave = () => {
      if(isAutoplay) {
        startInterval()
      }
    }

    if(sliderRef.current) {
      sliderRef.current.addEventListener('mouseenter', handleMouseEnter)
      sliderRef.current.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if(sliderRef.current) {
        sliderRef.current.removeEventListener('mouseenter', handleMouseEnter)
        sliderRef.current.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [content])

  if (content.length === 0 && !content) {
    // return <PreloaderUI />
  }

  return (
    <div className={styles.slider} ref={sliderRef}>
      <ArrowForward color="primary" />
      <ArrowBack />
    </div>
  )
}