import { useState } from "react";
import { ButtonUI } from "../../components/ui/button-ui/button-ui";
import { EventUI } from "../../components/ui/event-ui/event-ui";
import { PreloaderUI } from "../../components/ui/preloader-ui/preloader-ui";
import { ModalConfirmation } from "../../components/modal-confirmation/modal-confirmation";
import { ModalUI } from "../../components/ui/modal-ui/modal-ui";
import { FormUI } from "../../components/ui/form-ui/form-ui";
import { InputUIProps } from "../../components/ui/input-ui/type";
import { ButtonUIProps } from "../../components/ui/button-ui/type";
import { TEvent } from "../../utils/types";
import { Add, Archive, Delete, Edit } from "@mui/icons-material";
import useSWR, { mutate } from "swr";
import {
  addEvent,
  archiveEvent,
  deleteEvent,
  editEvent,
  fetchEvents,
} from "../../services/fetcher/fetcher";
import { AdminLayoutUI } from "../../components/ui/admin-layout-ui/admin-layout-ui";

import styles from "./admin-events.module.scss";

export const AdminEvents = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete" | null>(
    null
  );
  const [values, setValues] = useState<TEvent>({
    date: "",
    time: "",
    location: "",
    title: "",
    program: [],
    link: "",
  });

  const { data, error, isLoading } = useSWR("events", fetchEvents);

  const handleOpenAdd = () => {
    setValues({
      date: "",
      time: "",
      location: "",
      title: "",
      program: [],
      link: "",
    });
    setModalType("add");
    setIsOpen(true);
  };

  const handleAdd = async () => {
    try {
      const newEvent = await addEvent(values);
      mutate(
        "events",
        (currentEvents: TEvent[] = []) => [...currentEvents, newEvent],
        false
      );
      setIsOpen(false);
    } catch (err) {
      console.error(`Error adding event: ${err}`);
    }
  };

  const handleOpenEdit = (event: TEvent) => {
    setValues(event);
    setModalType("edit");
    setIsOpen(true);
  };

  const handleEdit = async () => {
    try {
      const updatedEvent = await editEvent(values);
      mutate(
        "events",
        (currentEvents: TEvent[] = []) =>
          currentEvents.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          ),
        false
      );
      setIsOpen(false);
    } catch (err) {
      console.error(`Error editing event: ${err}`);
    }
  };

  const handleArchieve = async (event: TEvent) => {
    if (!event.id) return;
    try {
      await archiveEvent(event.id);
      mutate(
        "events",
        (currentEvents: TEvent[] = []) =>
          currentEvents.map((e) =>
            e.id === event.id ? { ...e, archived: true } : e
          ),
        false
      );
    } catch (err) {
      console.error(`Error archiving event: ${err}`);
    }
  };

  const handleOpenDelete = (event: TEvent) => {
    setValues(event);
    setModalType("delete");
    setIsOpen(true);
  };

  const handleDelete = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      mutate(
        "events",
        (currentEvents: TEvent[] = []) =>
          currentEvents.filter((event) => event.id !== eventId),
        false
      );
      setIsOpen(false);
    } catch (err) {
      console.error(`Error deleting event: ${err}`);
    }
  };

  const handleClose = () => setIsOpen(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]:
        name === "program"
          ? value.split(",").map((item) => item.trim())
          : value,
    });
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  const inputs: InputUIProps[] = [
    {
      label: "Date",
      name: "date",
      type: "text",
      value: values.date,
      variant: "outlined",
      error: values.date ? "" : "Поле должно быть заполненным",
      required: true,
      color: "primary",
      helperText: "Введите дату концерта",
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
      label: "Time",
      name: "time",
      type: "text",
      value: values.time,
      variant: "outlined",
      error: values.time ? "" : "Поле должно быть заполненным",
      required: true,
      color: "primary",
      helperText: "Введите время концерта",
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
      label: "Location",
      name: "location",
      type: "text",
      value: values.location,
      variant: "outlined",
      error: values.location ? "" : "Поле должно быть заполненным",
      required: true,
      color: "primary",
      helperText: "Введите место проведения концерта",
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
      label: "Title",
      name: "title",
      type: "text",
      value: values.title,
      variant: "outlined",
      error: values.title ? "" : "Поле должно быть заполненным",
      required: true,
      color: "primary",
      helperText: "Введите название концерта",
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
      label: "Program",
      name: "program",
      type: "text",
      value: values.program.join(", "),
      variant: "outlined",
      error: values.program.length > 0 ? "" : "Поле должно быть заполненным",
      required: false,
      color: "primary",
      helperText: "Введите программу концерта",
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
      label: "Link",
      name: "link",
      type: "text",
      value: values.link,
      variant: "outlined",
      error: values.link ? "" : "Поле должно быть заполненным",
      required: false,
      color: "primary",
      helperText: "Введите ссылку на концерт",
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
  ];
  const buttons: ButtonUIProps[] = [
    {
      buttonText: "Закрыть",
      onClick: handleClose,
      variant: "contained",
      color: "primary",
      sx: {
        "&.Mui-disabled": {
          backgroundColor: "#555", // Серый фон для неактивной кнопки
          color: "#fff", // Белый текст для контраста
        },
      },
    },
    {
      buttonText: "Сохранить",
      onClick: () => (modalType === "add" ? handleAdd() : handleEdit()),
      variant: "contained",
      color: "primary",
      sx: {
        "&.Mui-disabled": {
          backgroundColor: "#555", // Серый фон для неактивной кнопки
          color: "#fff", // Белый текст для контраста
        },
      },
    },
  ];

  if (isLoading) return <PreloaderUI />;
  if (error)
    return (
      <p className={styles.admin_events__event__error}>
        Что-то пошло не так, но мы это исправим!
      </p>
    );

  return (
    <>
      <AdminLayoutUI>
        <div className={styles.admin_events}>
          {data!.length > 0 ? (
            data!.map((event) => {
              return (
                <div className={styles.admin_events__event}>
                  {event.archived === true && (
                    <span style={{ color: "red" }}>Archived</span>
                  )}
                  <EventUI key={event.id} event={event} />
                  <div className={styles.admin_events__event__buttons}>
                    <ButtonUI
                      buttonText="Edit"
                      onClick={() => handleOpenEdit(event)}
                      startIcon={<Edit />}
                    />
                    <ButtonUI
                      buttonText="Delete"
                      onClick={() => handleOpenDelete(event)}
                      startIcon={<Delete />}
                    />
                    <ButtonUI
                      buttonText="archieve"
                      onClick={() => handleArchieve(event)}
                      startIcon={<Archive />}
                    />
                  </div>
                  {isOpen && modalType === "delete" ? (
                    <ModalConfirmation
                      onCancel={handleClose}
                      onConfirm={() => handleDelete(event.id!)}
                    />
                  ) : isOpen && modalType === "edit" ? (
                    <ModalUI onClose={handleClose}>
                      <FormUI
                        inputs={inputs}
                        buttons={buttons}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                      />
                    </ModalUI>
                  ) : null}
                </div>
              );
            })
          ) : (
            <p className={styles.admin_events__event__error}>
              Тут ничего нет, пора бы добавить!
            </p>
          )}
          <ButtonUI
            buttonText="Add"
            onClick={handleOpenAdd}
            startIcon={<Add />}
          />
          {isOpen && modalType === "add" && (
            <ModalUI onClose={handleClose}>
              <FormUI
                inputs={inputs}
                buttons={buttons}
                onChange={handleChange}
                onSubmit={handleSubmit}
                formHeader="Добавить концерт"
              />
            </ModalUI>
          )}
        </div>
      </AdminLayoutUI>
    </>
  );
};
