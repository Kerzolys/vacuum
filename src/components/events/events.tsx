import { useGetEventsQuery } from '../../features/events/events'
import { EventUI } from '../ui/event-ui/event-ui'
import { PreloaderUI } from '../ui/preloader-ui/preloader-ui'
import { SectionLineUI } from '../ui/section-line-ui/section-line-ui'
import styles from './events.module.scss'

export const Events = ({ }) => {
  const { data: events, isLoading, isError } = useGetEventsQuery()
  if (isLoading) return <PreloaderUI />
  if (isError) return <p>Что-то пошло не так, но мы это исправим!</p>
  if(!events || events.length === 0) return <p>Здесь скоро будут разные концерты!</p>
  return (
    <section id='events' className={styles.events}>
      <h1 className={styles.events__title}>Events</h1>
      <SectionLineUI />
      {events.length > 0 && events.map(event => {
        return <EventUI key={event.id} event={event} />
      })}
      <SectionLineUI isForward={false} />
    </section>
  )
}