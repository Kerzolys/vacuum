import { forwardRef } from 'react'
import { SlideImageUI } from '../slide-image-ui/slide-image-ui'
import { SlideVideoUI } from '../slide-video-ui/slide-video-ui'
import styles from './slider-ui.module.scss'
import { SliderUIProps } from './type'
import classNames from 'classnames'

export const SliderUI = forwardRef<HTMLDivElement, SliderUIProps>(
  ({ slides, type, currentSlide }, ref) => {
    return (
      <div className={styles.slider} ref={ref}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={classNames(styles.slider__slide, {[styles.slider__slide_activeSlide]:currentSlide === index})}
          >
            {type === "video" ? (
              <SlideVideoUI video={slide} />
            ) : (
              <SlideImageUI image={slide} />
            )}
          </div>
        ))}
      </div>
    );
  }
);