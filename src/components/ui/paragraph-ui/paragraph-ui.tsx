import styles from './paragraph-ui.module.scss'
import { ParagraphUIProps } from './type'

export const ParagraphUI: React.FC<ParagraphUIProps> = ({ paragraph }) => {
  return <p className={styles.paragraph}>{paragraph.paragraph}</p>
}