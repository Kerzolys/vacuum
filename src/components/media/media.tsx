import { testMedia } from '../../utils/testMedia'
import { Slider } from '../slider/slider'
import useSWR from 'swr'

import styles from './media.module.scss'
import { TVideo } from '../../utils/types'
import { fetchVideos } from '../../services/fetcher/fetcher'
import { PreloaderUI } from '../ui/preloader-ui/preloader-ui'
import { convertToEmbedUrl } from '../../features/hooks/convertToEmbed'


export const Media = () => {
  const { data, error, isLoading } = useSWR<TVideo[]>('videos', fetchVideos)

  const updatedData = data?.map(video => ({
    ...video,
    link: video.link ? convertToEmbedUrl(video.link) : ''
  }))

  if (isLoading) return <PreloaderUI />
  if (error) return <p>Что-то пошло не так, но мы это исправим!</p>

  return (
    <section id='media' className={styles.media}>
      <h1 className={styles.media__title}>Media</h1>
      {updatedData && <Slider isAutoplay={false} content={updatedData} type='video' />}
    </section>
  )
}

