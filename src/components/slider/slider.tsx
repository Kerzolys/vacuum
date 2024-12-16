import { useEffect, useRef, useState } from "react"
import { SliderProps } from "./type"

import styles from './slider.module.scss'
import { ArrowBack, ArrowForward } from "@mui/icons-material"
import { SliderUI } from "../ui/slider-ui/slider-ui"
import { PreloaderUI } from "../ui/preloader-ui/preloader-ui"
import { ButtonUI } from "../ui/button-ui/button-ui"

export const Slider: React.FC<SliderProps> = ({ content, isAutoplay, type }) => {
  const sliderContent = content

  const [currentSlide, setCurrentSlide] = useState(0)

  const sliderRef = useRef<HTMLDivElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    if (content.length > 0) {
      setCurrentSlide(currentSlide === content.length - 1 ? 0 : currentSlide + 1)
      console.log('next', currentSlide)
    }
  }
  const previousSlide = () => {
    if (content.length > 0) {
      setCurrentSlide(currentSlide === 0 ? content.length - 1 : currentSlide - 1)
      console.log('prev', currentSlide)
    }
  }

  const startInterval = () => {
    intervalRef.current = setInterval(nextSlide, 3000)
  }

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    if (content.length > 0 && isAutoplay) {
      startInterval()
    }

    const handleMouseEnter = () => {
      stopInterval()
    }

    const handleMouseLeave = () => {
      if (isAutoplay) {
        startInterval()
      }
    }

    if (sliderRef.current) {
      sliderRef.current.addEventListener('mouseenter', handleMouseEnter)
      sliderRef.current.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (sliderRef.current) {
        sliderRef.current.removeEventListener('mouseenter', handleMouseEnter)
        sliderRef.current.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [content, isAutoplay])

  // if (loading) {
  //   return <PreloaderUI />
  // }
  if (content.length === 0) {
    return <p>Скоро здесь будет много всего интересного!.</p>
  }

  return (
    <div className={styles.slider} >
      <ButtonUI icon={<ArrowBack />} buttonText="back" onClick={previousSlide} type="button" />
      {/* <ArrowBack onClick={previousSlide} /> */}
      <SliderUI ref={sliderRef} slides={sliderContent} type={type} currentSlide={currentSlide} />
      {/* <ArrowForward onClick={nextSlide} /> */}
      <ButtonUI icon={<ArrowForward />} buttonText="forward" onClick={nextSlide} type="button" />

    </div>
  )
}