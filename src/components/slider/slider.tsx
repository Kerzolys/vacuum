import { useCallback, useEffect, useRef, useState } from "react";
import { SliderProps } from "./type";

import styles from "./slider.module.scss";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { SliderUI } from "../ui/slider-ui/slider-ui";
import { Button } from "@mui/material";
import classNames from "classnames";

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

  const nextSlide = useCallback(() => {
    if (content.length > 0) {
      setCurrentSlide((prev) =>
        prev === content.length - 1 ? 0 : prev + 1
      );
    }
  }, [content.length]);
  
  const previousSlide = () => {
    if (content.length > 0) {
      setCurrentSlide(
        currentSlide === 0 ? content.length - 1 : currentSlide - 1
      );
    }
  };

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startInterval = useCallback(() => {
    stopInterval();
    intervalRef.current = setInterval(nextSlide, 3000);
  }, [nextSlide, stopInterval]);

  useEffect(() => {
    const node = sliderRef.current; // фиксируем DOM-элемент
    if (!node) return;

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

    node.addEventListener("mouseenter", handleMouseEnter);
    node.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node.removeEventListener("mouseenter", handleMouseEnter);
      node.removeEventListener("mouseleave", handleMouseLeave);
      stopInterval();
    };
  }, [content.length, isAutoplay, startInterval, stopInterval]);

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
      <Button
        onClick={previousSlide}
        className={classNames(
          styles.slider__button,
          styles.slider__button_back
        )}
      >
        <ArrowBack style={{ color: "white", fontSize: "48px" }} />
      </Button>
      <SliderUI
        ref={sliderRef}
        slides={sliderContent}
        type={type}
        currentSlide={currentSlide}
      />
      <Button
        onClick={nextSlide}
        className={classNames(
          styles.slider__button,
          styles.slider__button_forward
        )}
      >
        <ArrowForward style={{ color: "white", fontSize: "48px" }} />
      </Button>
    </div>
  );
};
