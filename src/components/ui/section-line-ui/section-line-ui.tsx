import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './section-line-ui.module.scss'

export const SectionLineUI = ({isForward = true}: {isForward?: boolean}) => {
  const [isVisible, setIsVisible] = useState(false);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      };
    }, { threshold: 0.5 });
    if (lineRef.current) {
      observer.observe(lineRef.current);
    }

    return () => {
      if (lineRef.current) {
        observer.unobserve(lineRef.current);
      }
    };
  }, [])
  return <div ref={lineRef} className={classNames(styles.line, {[styles.line_visible]: isVisible, [styles.line_backward]: !isForward})}></div>
}