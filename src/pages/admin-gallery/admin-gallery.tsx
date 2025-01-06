import { useState } from "react"
import { AdminLayoutUI } from "../../components/ui/admin-layout-ui/admin-layout-ui"
import { TImage } from "../../utils/types"
import useSWR, { mutate } from "swr"
import { addImage, deleteImage, editImage, fetchImages } from "../../services/fetcher/fetcher"
import { PreloaderUI } from "../../components/ui/preloader-ui/preloader-ui"
import { ButtonUI } from "../../components/ui/button-ui/button-ui"
import { Add } from "@mui/icons-material"
import { FormUI } from "../../components/ui/form-ui/form-ui"
import { ModalUI } from "../../components/ui/modal-ui/modal-ui"
import { InputUIProps } from "../../components/ui/input-ui/type"
import { ButtonUIProps } from "../../components/ui/button-ui/type"

export const AdminGallery = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'edit' | 'delete' | null>(null)
  const [values, setValues] = useState<TImage>({
    title: '',
    link: '',
  })
  const [file, setFile] = useState<File | null>(null);

  const { data, error, isLoading } = useSWR('images', fetchImages)

  const handleOpenAdd = () => {
    setValues({
      title: '',
      link: '',
    });
    setIsOpen(true);
    setModalType('add');
  };

  const handleAdd = async () => {
    if (!file) {
      alert('Выберите файл')
      return
    }
    try {
      const downloadURL = await addImage(file, values.title);
      await mutate('images')
      alert('Файл успешно загружен')
      setIsOpen(false);
      setFile(null);
      setValues({
        title: '',
        link: '',
      });
    } catch (err) {
      console.error(`Error adding image: ${err}`);
    }
  };

  const handleOpenEdit = (image: TImage) => {
    setValues(image);
    setIsOpen(true);
    setModalType('edit');
  };

  const handleEdit = async () => {
    try{
      await editImage(values, file!)
      alert('Изображение успешно отредактировано')
      setIsOpen(false);
      mutate('images')
    } catch (err) {
      console.error(`Error editing image: ${err}`);
    }
  }

  const handleOpenDelete = (image: TImage) => {
    setValues(image);
    setIsOpen(true);
    setModalType('delete');
  };

  const handleDelete = async () => {
    try {
      await deleteImage(values.id!)
      alert('Изображение успешно удалено')
      setIsOpen(false);
      mutate('images')
    } catch (err) {
      console.error(`Error deleting image: ${err}`);
    }
  }


  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
  }

  const handleClose = () => setIsOpen(false)

  const inputs: InputUIProps[] = [
    {
      label: 'Title',
      name: 'title',
      type: 'text',
      value: values.title,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValues({ ...values, title: e.target.value }),
      error: ''
    },
    {
      label: "Upload Image",
      name: "file",
      type: "file",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        e.target.files && setFile(e.target.files[0]),
      error: "",
    },
  ]

  const buttons: ButtonUIProps[] = [
    {
      buttonText: 'Закрыть',
      onClick: handleClose,
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
  // if (!data || data.length === 0) return <p>Тут ничего нет, пора бы добавить!</p>
  return (
    <>
      <AdminLayoutUI>
        <>
          {!data || data.length === 0 && (
            <p>Тут ничего нет, пора бы добавить!</p>
          )}
          <ButtonUI buttonText="Add" onClick={handleOpenAdd} startIcon={<Add />} />
          {isOpen && modalType === 'add' && (
            <ModalUI onClose={handleClose}>
              <FormUI
                inputs={inputs}
                buttons={buttons}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            </ModalUI>
          )}
        </>
      </AdminLayoutUI>
    </>
  )
}