import useSWR, { mutate } from 'swr'
import { addVideo, deleteVideo, editVideo, fetchVideos } from '../../services/fetcher/fetcher'
import { PreloaderUI } from '../../components/ui/preloader-ui/preloader-ui'
import { convertToEmbedUrl } from '../../features/hooks/convertToEmbed'
import { ButtonUI } from '../../components/ui/button-ui/button-ui'
import { Add, Delete, Edit } from '@mui/icons-material'
import { ButtonUIProps } from '../../components/ui/button-ui/type'
import { InputUIProps } from '../../components/ui/input-ui/type'
import { TVideo } from '../../utils/types'
import { useState } from 'react'
import { ModalUI } from "../../components/ui/modal-ui/modal-ui";
import { FormUI } from "../../components/ui/form-ui/form-ui";
import { ModalConfirmation } from '../../components/modal-confirmation/modal-confirmation'

import styles from './admin-media.module.scss'
import { AdminLayoutUI } from '../../components/ui/admin-layout-ui/admin-layout-ui'

export const AdminMedia = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'edit' | 'delete' | null>(null)
  const [values, setValues] = useState<TVideo>(
    {
      title: '',
      link: '',
    }
  )

  const { data, error, isLoading } = useSWR('videos', fetchVideos)
  const updatedData = data?.map(video => ({
    ...video,
    link: video.link.includes('embed') ? video.link : convertToEmbedUrl(video.link),
  }));

  const handleOpenAdd = () => {
    setValues({
      title: '',
      link: '',
    });

    setModalType('add')
    setIsOpen(true)
  }

  const handleAdd = async () => {
    try {
      const newVideo = await addVideo(values);
      mutate('videos', (currentVideos: TVideo[] = []) => [...currentVideos, newVideo], false)
      setIsOpen(false)
    } catch (err) {
      console.error(`Error adding video: ${err}`);
    }
  }

  const handleOpenEdit = (event: TVideo) => {
    setValues(event)
    setModalType('edit')
    setIsOpen(true)
  }

  const handleEdit = async () => {
    try {
      const updatedVideo = await editVideo(values);
      mutate('videos', (currentVideos: TVideo[] = []) => currentVideos.map(video => video.id === updatedVideo.id ? updatedVideo : video), false)
      setIsOpen(false)
    } catch (err) {
      console.error(`Error editing video: ${err}`);
    }
  }

  const handleOpenDelete = (event: TVideo) => {
    setValues(event)
    setModalType('delete')
    setIsOpen(true)
  }

  const handleDelete = async (videoId: string) => {
    try {
      await deleteVideo(videoId)
      mutate('videos', (currentVideos: TVideo[] = []) => currentVideos.filter(video => video.id !== videoId), false)
    } catch (err) {
      console.error(`Error deleting video: ${err}`);
    }
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    console.log('submitted')
  }

  const handleClose = () => setIsOpen(false)


  const inputs: InputUIProps[] = [
    {
      label: 'Title',
      name: 'title',
      type: 'text',
      value: values.title,
      variant: 'outlined',
      error: values.title ? '' : 'Поле должно быть заполненным',
      required: true,
      color: 'primary',
      helperText: 'Введите название концерта',
      sx: {
        "& .MuiInputBase-input": {
          color: "#fff", // ��вет текста внутри поля
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff", // ��вет обводки внутри поля
        },
        "& .MuiInputLabel-root": {
          color: "#fff", // Цвет лейбла
        },
      },
    },
    {
      label: 'Link',
      name: 'link',
      type: 'text',
      value: values.link,
      variant: 'outlined',
      error: values.link ? '' : 'Поле должно быть заполненным',
      required: false,
      color: 'primary',
      helperText: 'Введите ссылку на концерт',
      sx: {
        "& .MuiInputBase-input": {
          color: "#fff", // ��вет текста внутри поля
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff", // ��вет обводки внутри поля
        },
        "& .MuiInputLabel-root": {
          color: "#fff", // Цвет лейбла
        },
      }
    }
  ]
  const buttons: ButtonUIProps[] = [
    {
      buttonText: 'Закрыть',
      onClick: () => setIsOpen(false),
      variant: 'contained',
      color: 'primary',
      sx: {
        '&.Mui-disabled': {
          backgroundColor: '#555', // Серый фон для неактивной кнопки
          color: '#fff', // Белый текст для контраста
        },
      },
    },
    {
      buttonText: 'Сохранить',
      onClick: () => (modalType === 'add' ? handleAdd() : handleEdit()),
      variant: 'contained',
      color: 'primary',
      sx: {
        '&.Mui-disabled': {
          backgroundColor: '#555', // Серый фон для неактивной кнопки
          color: '#fff', // Белый текст для контраста
        },
      },
    },
  ]

  if (isLoading) return <PreloaderUI />
  if (error) return <p>Что-то пошло не так, но мы это исправим!</p>

  return (
    <>
      <AdminLayoutUI>
        <div className={styles.videos}>

          <div>
            {updatedData && updatedData.map(video => (
              <div className={styles.video} key={video.id}>
                <h2 className={styles.video__title}>{video.title}</h2>
                <iframe width="560" height="315" src={video.link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                {video.id &&
                  <div className={styles.video__buttons}>
                    <ButtonUI buttonText='Delete' startIcon={<Delete />} onClick={() => handleOpenDelete(video)} />
                    <ButtonUI buttonText="Edit" onClick={() => handleOpenEdit(video)} startIcon={<Edit />} />
                  </div>
                }
                {isOpen && modalType === 'delete' ?
                  <ModalConfirmation onCancel={handleClose} onConfirm={() => handleDelete(video.id!)} />
                  : isOpen && modalType === 'edit' ? <ModalUI onClose={handleClose} >
                    <FormUI
                      inputs={inputs}
                      buttons={buttons}
                      onChange={handleChange}
                      onSubmit={handleSubmit}
                    />
                  </ModalUI> : null
                }
              </div>
            ))}

          </div>
          <ButtonUI buttonText='Add' startIcon={<Add />} onClick={handleOpenAdd} />
          {isOpen && modalType === 'add' && (
            <ModalUI onClose={() => setIsOpen(false)}>
              <FormUI inputs={inputs} buttons={buttons} onSubmit={handleSubmit} onChange={handleChange} formHeader='Добавить видео' />
            </ModalUI>
          )}
        </div>
      </AdminLayoutUI>
    </>
  )
}