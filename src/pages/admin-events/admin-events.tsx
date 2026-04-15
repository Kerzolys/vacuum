import { useState } from "react";
import { ButtonUI } from "../../components/ui/button-ui/button-ui";
import { EventUI } from "../../components/ui/event-ui/event-ui";
import { PreloaderUI } from "../../components/ui/preloader-ui/preloader-ui";
import { ModalConfirmation } from "../../components/modal-confirmation/modal-confirmation";
import { ModalUI } from "../../components/ui/modal-ui/modal-ui";
import { FormUI } from "../../components/ui/form-ui/form-ui";
import type { InputUIProps } from "../../components/ui/input-ui/type";
import type { ButtonUIProps } from "../../components/ui/button-ui/type";
import type { TEvent } from "../../utils/types";
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
import { useTranslation } from "react-i18next";

export const AdminEvents = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete" | null>(
    null
  );
  const [values, setValues] = useState<TEvent>({
    date: "",
    time: "",
    location: { ru: "", en: "" },
    title: { ru: "", en: "" },
    program: {
      ru: [],
      en: [],
    },
    link: "",
  });

  const { t } = useTranslation();

  const { data, error, isLoading } = useSWR("events", fetchEvents);

  const handleOpenAdd = () => {
    setValues({
      date: "",
      time: "",
      location: { ru: "", en: "" },
      title: { ru: "", en: "" },
      program: {
        ru: [],
        en: [],
      },
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

    setValues((prev) => {
      const keys = name.split("."); // ["location", "ru"]

      if (keys.length === 1) {
        return {
          ...prev,
          [name]: value,
        };
      }

      const [field, lang] = keys as [
        "location" | "title" | "program",
        "ru" | "en",
      ];

      if (field === "program") {
        return {
          ...prev,
          program: {
            ...prev.program,
            [lang]: value.split(";").map((i) => i.trim()),
          },
        };
      }

      return {
        ...prev,
        [field]: {
          ...prev[field],
          [lang]: value,
        },
      };
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
          color: "#fff",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff",
        },
        "& .MuiInputLabel-root": {
          color: "#fff",
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
          color: "#fff",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff",
        },
        "& .MuiInputLabel-root": {
          color: "#fff",
        },
      },
    },
    {
      label: "Location RU",
      name: "location.ru",
      type: "text",
      value: values.location?.ru,
      variant: "outlined",
      error: values.location?.ru ? "" : "Поле должно быть заполненным",
      required: true,
      color: "primary",
      helperText: "Введите место проведения концерта",
      sx: {
        "& .MuiInputBase-input": {
          color: "#fff",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff",
        },
        "& .MuiInputLabel-root": {
          color: "#fff",
        },
      },
    },
    {
      label: "Location EN",
      name: "location.en",
      type: "text",
      value: values.location?.en,
      variant: "outlined",
      error: values.location?.en ? "" : "Поле должно быть заполненным",
      required: true,
      color: "primary",
      helperText: "Введите место проведения концерта",
      sx: {
        "& .MuiInputBase-input": {
          color: "#fff",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff",
        },
        "& .MuiInputLabel-root": {
          color: "#fff",
        },
      },
    },
    {
      label: "Title RU",
      name: "title.ru",
      type: "text",
      value: values.title?.ru,
      variant: "outlined",
      error: values.title?.ru ? "" : "Поле должно быть заполненным",
      required: true,
      color: "primary",
      helperText: "Введите название концерта",
      sx: {
        "& .MuiInputBase-input": {
          color: "#fff",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff",
        },
        "& .MuiInputLabel-root": {
          color: "#fff",
        },
      },
    },
    {
      label: "Title EN",
      name: "title.en",
      type: "text",
      value: values.title?.en,
      variant: "outlined",
      error: values.title?.en ? "" : "Поле должно быть заполненным",
      required: true,
      color: "primary",
      helperText: "Введите название концерта",
      sx: {
        "& .MuiInputBase-input": {
          color: "#fff",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff",
        },
        "& .MuiInputLabel-root": {
          color: "#fff",
        },
      },
    },
    {
      label: "Program RU",
      name: "program.ru",
      type: "text",
      value: values.program.ru.join("; "),
      variant: "outlined",
      error: values.program.ru.length > 0 ? "" : "Поле должно быть заполненным",
      required: false,
      color: "primary",
      helperText: "Введите программу концерта",
      sx: {
        "& .MuiInputBase-input": {
          color: "#fff",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff",
        },
        "& .MuiInputLabel-root": {
          color: "#fff",
        },
      },
    },
    {
      label: "Program EN",
      name: "program.en",
      type: "text",
      value: values.program.en.join("; "),
      variant: "outlined",
      error: values.program.en.length > 0 ? "" : "Поле должно быть заполненным",
      required: false,
      color: "primary",
      helperText: "Введите программу концерта",
      sx: {
        "& .MuiInputBase-input": {
          color: "#fff",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff",
        },
        "& .MuiInputLabel-root": {
          color: "#fff",
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
          color: "#fff",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff",
        },
        "& .MuiInputLabel-root": {
          color: "#fff",
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
          backgroundColor: "#555",
          color: "#fff",
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
          backgroundColor: "#555",
          color: "#fff",
        },
      },
    },
  ];

  if (isLoading) return <PreloaderUI />;
  if (error)
    return <p className={styles.admin_events__event__error}>{t("error")}</p>;

  return (
    <>
      <AdminLayoutUI>
        <div className={styles.admin_events}>
          {data!.length > 0 ? (
            data!.map((event) => {
              return (
                <div className={styles.admin_events__event} key={event.id}>
                  {event.archived === true && (
                    <span style={{ color: "red" }}>Archived</span>
                  )}
                  <EventUI event={event} />
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
          {isOpen && modalType === "delete" && values.id ? (
            <ModalConfirmation
              onCancel={handleClose}
              onConfirm={() => handleDelete(values.id!)}
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
      </AdminLayoutUI>
    </>
  );
};
