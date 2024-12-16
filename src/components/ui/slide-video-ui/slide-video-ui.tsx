import styles from './slide-video-ui.module.scss'
import { SlideVideoUIProps } from './type'

export const SlideVideoUI: React.FC<SlideVideoUIProps> = ({ video }) => {
  return <div className={styles.slide}>
    <iframe
      className={styles.video}
      width="100%" height="100%"
      src={video.link}
      allow="autoplay; fullscreen"
      title="Background Video"
      frameBorder={0}
    />
    <h2 className={styles.title}>{video.title}</h2>
  </div>
}