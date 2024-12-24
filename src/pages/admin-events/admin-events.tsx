import { useState } from "react";
import { ButtonUI } from "../../components/ui/button-ui/button-ui";
import { EventUI } from "../../components/ui/event-ui/event-ui";
import { PreloaderUI } from "../../components/ui/preloader-ui/preloader-ui";
import { useAddEventMutation, useDeleteEventMutation, useGetEventsQuery, useUpdateEventMutation } from "../../features/events/events";
import { ModalConfirmation } from "../../components/modal-confirmation/modal-confirmation";
import { ModalUI } from "../../components/ui/modal-ui/modal-ui";
import { FormUI } from "../../components/ui/form-ui/form-ui";
import { InputUIProps } from "../../components/ui/input-ui/type";
import { ButtonUIProps } from "../../components/ui/button-ui/type";
import { TEvent } from "../../utils/types";
import { Add, Delete, Edit } from "@mui/icons-material";

export const AdminEvents = ({ }) => {
  const { data: events, isLoading, isError } = useGetEventsQuery()
  const [addEvent] = useAddEventMutation()
  const [deleteEvent] = useDeleteEventMutation()
  const [updateEvent] = useUpdateEventMutation()
  const { refetch } = useGetEventsQuery();
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'edit' | 'delete' | null>(null)
  const [values, setValues] = useState<TEvent>(
    {
      // id: '',
      date: '',
      time: '',
      location: '',
      title: '',
      program: [],
      link: '',
    }
  )

  const handleOpenAdd = () => {
    // setValues(event)
    setValues({
      // id: '',
      date: '',
      time: '',
      location: '',
      title: '',
      program: [],
      link: '',
    });
    setModalType('add')
    setIsOpen(true)
  }

  const handleOpenEdit = (event: TEvent) => {
    setValues(event)
    setModalType('edit')
    setIsOpen(true)
  }

  const handleOpenDelete = (event: TEvent) => {
    console.log(event)
    setValues(event)
    setModalType('delete')
    setIsOpen(true)
  }

  const handleClose = () => setIsOpen(false)

  const handleAdd = async () => {
    try {
      if (values) {
        const result = await addEvent(values).unwrap();
        console.log(`New event has been added.`);
        console.log('New event added with ID:', result.id);
        refetch()
        handleClose()
      }
    } catch (err) {
      console.error(`Error adding event: ${err}`);
    }
  }
  const handleEdit = async () => {
    console.log('edit');
    try {
      if (values) {
        await updateEvent(values).unwrap();
        console.log(`Event with ID ${values.id} has been updated.`);
        refetch()
        handleClose()
      }
    } catch (err) {
      console.error(`Error updating event: ${err} `);
    }
  }

  const handleDelete = async (eventId: string | undefined) => {
    console.log("Deleting Event:", eventId);
    if(!eventId) return 
    try {
      if (values && values.id) {
        const response = await deleteEvent(values.id);
        console.log(response)
        console.log(`Event with ID ${values.id} has been deleted.`);
        refetch()
        handleClose()
      }
    } catch (err) {
      console.error(`Error deleting event: ${err} `);

    }
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: name === 'program' ? value.split(',').map(item => item.trim()) : value,
    });
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    console.log('submitted')
  }

  const inputs: InputUIProps[] = [
    {
      label: 'Date',
      name: 'date',
      type: 'text',
      value: values.date,
      variant: 'outlined',
      error: values.date ? '' : 'Поле должно быть заполненным',
      required: true,
      color: 'primary',
      helperText: 'Введите дату концерта',
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
      label: 'Time',
      name: 'time',
      type: 'text',
      value: values.time,
      variant: 'outlined',
      error: values.time ? '' : 'Поле должно быть заполненным',
      required: true,
      color: 'primary',
      helperText: 'Введите время концерта',
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
      label: 'Location',
      name: 'location',
      type: 'text',
      value: values.location,
      variant: 'outlined',
      error: values.location ? '' : 'Поле должно быть заполненным',
      required: true,
      color: 'primary',
      helperText: 'Введите место проведения концерта',
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
      label: 'Program',
      name: 'program',
      type: 'text',
      value: values.program.join(', '),
      variant: 'outlined',
      error: values.program.length > 0 ? '' : 'Поле должно быть заполненным',
      required: false,
      color: 'primary',
      helperText: 'Введите программу концерта',
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
  if (isError) return <p>Что-то пошло не так, но мы это исправим!</p>
  if (!events || events.length === 0) return <p>Тут ничего нет, пора бы добавить!</p>
  return (
    <div>
      {events.length > 0 && events.map(event => {
        return (
          <>
            <EventUI key={event.id} event={event} />
            <ButtonUI buttonText="Edit" onClick={() => handleOpenEdit(event)} startIcon={<Edit />} />
            <ButtonUI buttonText="Delete" onClick={() => handleOpenDelete(event)} startIcon={<Delete />} />
            {isOpen && modalType === 'delete' ?
              <ModalConfirmation onCancel={handleClose} onConfirm={() => handleDelete(event.id)} />
              : isOpen && modalType === 'edit' ? <ModalUI onClose={handleClose} >
                <FormUI
                  inputs={inputs}
                  buttons={buttons}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                />
              </ModalUI> : null
            }
          </>
        )
      })}
      <ButtonUI buttonText="Add" onClick={handleOpenAdd} startIcon={<Add />} />
      {isOpen && modalType === 'add' &&
        <ModalUI onClose={handleClose}>
          <FormUI
            inputs={inputs}
            buttons={buttons}
            onChange={handleChange}
            onSubmit={handleSubmit}
            formHeader="Добавить концерт"
          />
        </ModalUI>}
    </div>
  );
}