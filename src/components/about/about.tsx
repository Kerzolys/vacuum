import { testBio } from '../../utils/testBio'
import { ParagraphUI } from '../ui/paragraph-ui/paragraph-ui'
import { SectionLineUI } from '../ui/section-line-ui/section-line-ui'
import styles from './about.module.scss'

export const About = ({}) => {
  const bio = testBio
  return (
    <section id='about' className={styles.about}>
      <SectionLineUI />
      <h1 className={styles.about__title}>About Us</h1>
      {bio.length > 0  && bio.map(bio => {
        return (
          <ParagraphUI paragraph={bio} key={bio.id} />
        )
      })}
      <SectionLineUI isForward={false} />

    </section>
  )
}