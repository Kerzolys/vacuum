import { useState } from "react";
import type { TBio } from "../../utils/types";
import {
  addBio,
  deleteBio,
  editBio,
  fetchBio,
} from "../../services/fetcher/fetcher";
import useSWR, { mutate } from "swr";
import { AdminLayoutUI } from "../../components/ui/admin-layout-ui/admin-layout-ui";
import { ParagraphUI } from "../../components/ui/paragraph-ui/paragraph-ui";
import { ButtonUI } from "../../components/ui/button-ui/button-ui";
import { Add, Delete, Edit } from "@mui/icons-material";
import { ModalConfirmation } from "../../components/modal-confirmation/modal-confirmation";
import { ModalUI } from "../../components/ui/modal-ui/modal-ui";
import { FormUI } from "../../components/ui/form-ui/form-ui";

import styles from "./admin-about.module.scss";
import type { InputUIProps } from "../../components/ui/input-ui/type";
import type { ButtonUIProps } from "../../components/ui/button-ui/type";
import { PreloaderUI } from "../../components/ui/preloader-ui/preloader-ui";
import { useTranslation } from "react-i18next";

export const AdminAbout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete" | null>(
    null
  );
  const [values, setValues] = useState<TBio>({
    paragraph: { ru: "", en: "" },
    position: 0,
  });

  const { data, error, isLoading } = useSWR("bio", fetchBio);
  const { t } = useTranslation();

  const bio = data || [];

  const handleOpenAdd = () => {
    setValues({
      paragraph: { ru: "", en: "" },
      position: 0,
    });
    setIsOpen(true);
    setModalType("add");
  };

  const handleAdd = async () => {
    try {
      const newBio = await addBio(values);
      mutate(
        "bio",
        (currentBios: TBio[] = []) => [...currentBios, newBio],
        false
      );
      setIsOpen(false);
    } catch (err) {
      console.error(`Error adding bio: ${err}`);
    }
  };

  const handleOpenEdit = (bio: TBio) => {
    setValues(bio);
    setModalType("edit");
    setIsOpen(true);
  };

  const handleEdit = async () => {
    try {
      const updatedBio = await editBio(values);
      mutate(
        "bio",
        (currentBios: TBio[] = []) =>
          currentBios.map((bio) =>
            bio.id === updatedBio.id ? updatedBio : bio
          ),
        false
      );
      setIsOpen(false);
    } catch (err) {
      console.error(`Error editing bio: ${err}`);
    }
  };

  const handleOpenDelete = (bio: TBio) => {
    setValues(bio);
    setModalType("delete");
    setIsOpen(true);
  };

  const handleDelete = async (bioId: string) => {
    try {
      await deleteBio(bioId);
      mutate(
        "bio",
        (currentBios: TBio[] = []) =>
          currentBios.filter((bio) => bio.id !== bioId),
        false
      );
      setIsOpen(false);
    } catch (err) {
      console.error(`Error deleting bio: ${err}`);
    }
  };

  const handleClose = () => setIsOpen(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    if (name === "paragraph_ru") {
      setValues({
        ...values,
        paragraph: {
          ...values.paragraph,
          ru: value,
        },
      });
    }

    if (name === "paragraph_en") {
      setValues({
        ...values,
        paragraph: {
          ...values.paragraph,
          en: value,
        },
      });
    }

    if (name === "position") {
      setValues({
        ...values,
        position: Number(value),
      });
    }
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  const inputs: InputUIProps[] = [
    {
      label: "Параграф RU",
      name: "paragraph_ru",
      type: "text",
      value: values.paragraph.ru,
      variant: "outlined",
      error: values.paragraph.ru ? "" : "Поле должно быть заполненным",
      required: true,
      color: "primary",
      helperText: "Введите текст пара��рафа",
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
      label: "Параграф EN",
      name: "paragraph_en",
      type: "text",
      value: values.paragraph.en,
      variant: "outlined",
      error: values.paragraph.en ? "" : "Поле должно быть заполненным",
      required: true,
      color: "primary",
      helperText: "Введите текст пара��рафа",
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
      label: "Позиция",
      name: "position",
      type: "text",
      value: values.position,
      variant: "outlined",
      error: values.position ? "" : "Поле должно быть заполненным",
      required: true,
      color: "primary",
      helperText: "Введите номер позиции параграфа",
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
        {bio.length > 0 ? (
          bio
            .sort((a, b) => a.position - b.position)
            .map((bio) => {
              return (
                <div className={styles.admin_bios__bio} key={bio.id}>
                  <ParagraphUI paragraph={bio} />
                  <div className={styles.admin_bios__bio__buttons}>
                    <ButtonUI
                      buttonText="Edit"
                      onClick={() => handleOpenEdit(bio)}
                      startIcon={<Edit />}
                    />
                    <ButtonUI
                      buttonText="Delete"
                      onClick={() => handleOpenDelete(bio)}
                      startIcon={<Delete />}
                    />
                  </div>
                  {isOpen && modalType === "delete" ? (
                    <ModalConfirmation
                      onCancel={handleClose}
                      onConfirm={() => handleDelete(bio.id!)}
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
          <p className={styles.admin_bios__bio__error}>
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
      </AdminLayoutUI>
    </>
  );
};
