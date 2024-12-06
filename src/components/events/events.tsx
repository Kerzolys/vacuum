import { testEvents } from '../../utils/testEvents'
import { EventUI } from '../ui/event-ui/event-ui'
import styles from './events.module.scss'

export const Events = ({ }) => {
  const events = testEvents
  return (
    <div className={styles.events}>
      <h1>Events</h1>
      {events.length > 0 && events.map(event => {
        return <EventUI key={event.id} event={event} />
      })}
    </div>
  )
}