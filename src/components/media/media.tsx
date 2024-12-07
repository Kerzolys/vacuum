import { testMedia } from '../../utils/testMedia'
import { Slider } from '../slider/slider'

import styles from './media.module.scss'

export const Media = () => {
  
  return (
    <section className={styles.media}>
      <h1 className={styles.media__title}>Media</h1>
      <Slider isAutoplay={false} content={testMedia}/>
    </section>
  )
}