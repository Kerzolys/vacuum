import { testEvents } from '../../utils/testEvents'
import { EventUI } from '../ui/event-ui/event-ui'
import { SectionLineUI } from '../ui/section-line-ui/section-line-ui'
import styles from './events.module.scss'

export const Events = ({ }) => {
  const events = testEvents
  return (
    <section className={styles.events}>
      <h1 className={styles.events__title}>Events</h1>
      <SectionLineUI />
      {events.length > 0 && events.map(event => {
        return <EventUI key={event.id} event={event} />
      })}
      <SectionLineUI isForward={false} />
    </section>
  )
}