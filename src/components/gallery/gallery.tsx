import { testImages } from "../../utils/testImages"
import { Slider } from "../slider/slider"

import styles from './gallery.module.scss'

export const Gallery = () => {
  return (
    <div className={styles.gallery}>
      <h1>Gallery</h1>
      <Slider content={testImages} isAutoplay={false} type='image' />
    </div>

  )
}