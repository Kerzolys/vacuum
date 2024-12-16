import styles from './slide-image-ui.module.scss'
import { SlideImageUIProps } from './type'

export const SlideImageUI : React.FC<SlideImageUIProps> = ({ image }) => {
  return <div className={styles.slide}>
    <img className={styles.slide__image} src={image.link} alt={image.title} />
    <h2 className={styles.title}>{image.title}</h2>
  </div>
}