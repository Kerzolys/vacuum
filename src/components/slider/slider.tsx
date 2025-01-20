import { useEffect, useRef, useState } from "react";
import { SliderProps } from "./type";

import styles from "./slider.module.scss";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { SliderUI } from "../ui/slider-ui/slider-ui";
import { Button } from "@mui/material";

export const Slider: React.FC<SliderProps> = ({
  content,
  isAutoplay,
  type,
}) => {
  const sliderContent = content;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleTouchStart = (evt: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(evt.touches[0].clientX);
    console.log("touch start", evt.touches[0].clientX);
  };
  const handleTouchMove = (evt: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(evt.touches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchStartX - touchEndX;
      if (distance > 50) {
        nextSlide();
      } else if (distance < -50) {
        previousSlide();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    if (content.length > 0) {
      setCurrentSlide(
        currentSlide === content.length - 1 ? 0 : currentSlide + 1
      );
      // console.log('next', currentSlide)
    }
  };
  const previousSlide = () => {
    if (content.length > 0) {
      setCurrentSlide(
        currentSlide === 0 ? content.length - 1 : currentSlide - 1
      );
      // console.log('prev', currentSlide)
    }
  };

  const startInterval = () => {
    intervalRef.current = setInterval(nextSlide, 3000);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (content.length > 0 && isAutoplay) {
      startInterval();
    }

    const handleMouseEnter = () => {
      stopInterval();
    };

    const handleMouseLeave = () => {
      if (isAutoplay) {
        startInterval();
      }
    };

    if (sliderRef.current) {
      sliderRef.current.addEventListener("mouseenter", handleMouseEnter);
      sliderRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (sliderRef.current) {
        sliderRef.current.removeEventListener("mouseenter", handleMouseEnter);
        sliderRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [content, isAutoplay]);

  if (content.length === 0) {
    return <p>Скоро здесь будет много всего интересного!.</p>;
  }

  return (
    <div
      className={styles.slider}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Button onClick={previousSlide} className={styles.slider__button}>
        <ArrowBack style={{ color: "white", fontSize: "48px" }} />
      </Button>
      <SliderUI
        ref={sliderRef}
        slides={sliderContent}
        type={type}
        currentSlide={currentSlide}
      />
      <Button onClick={nextSlide} className={styles.slider__button}>
        <ArrowForward style={{ color: "white", fontSize: "48px" }} />
      </Button>
    </div>
  );
};
