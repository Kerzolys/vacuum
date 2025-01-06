
import useSWR from 'swr'
import { EventUI } from '../ui/event-ui/event-ui'
import { PreloaderUI } from '../ui/preloader-ui/preloader-ui'
import { SectionLineUI } from '../ui/section-line-ui/section-line-ui'
import styles from './events.module.scss'
import { fetchEvents } from '../../services/fetcher/fetcher'

export const Events = ({ }) => {
  const { data, isLoading, error } = useSWR('events', fetchEvents)
  if (isLoading) return <PreloaderUI />
  if (error) return <p>Что-то пошло не так, но мы это исправим!</p>
  if(!data || data.length === 0) return <p>Здесь скоро будут разные концерты!</p>
  return (
    <section id='events' className={styles.events}>
      <h1 className={styles.events__title}>Events</h1>
      <SectionLineUI />
      {data.length > 0 && data.map(event => {
        return <EventUI key={event.id} event={event} />
      })}
      <SectionLineUI isForward={false} />
    </section>
  )
}