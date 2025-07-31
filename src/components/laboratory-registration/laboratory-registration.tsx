import React, { useEffect, useState } from "react";
import styles from "./laboratory-registration.module.scss";
import { ButtonUI } from "../ui/button-ui/button-ui";
import { InputUIProps } from "../ui/input-ui/type";
import {
  TRegistrationComposerValues,
  TRegistrationStringQuartetValues,
} from "../../utils/types";
import { ButtonUIProps } from "../ui/button-ui/type";
import { FormUI } from "../ui/form-ui/form-ui";
import { preparingComposerData } from "../../features/hooks/preparingComposerData";
import { ModalUI } from "../ui/modal-ui/modal-ui";
import { preparingStringQuartetData } from "../../features/hooks/preparingStringQuartetData";

export const LaboratoryRegistration = () => {
  const [formType, setFormType] = useState<
    "composer" | "string quartet" | null
  >(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);
  const [composerValues, setComposerValues] =
    useState<TRegistrationComposerValues>({
      composer_name: "",
      bio: null,
      photo_file: null,
      experience: "",
      audio_materials: [],
      video_materials: [],
      source_of_discovery: "",
      motivation_letter: null,
      email: "",
    });

  const [stringQuartetValues, setStringQuartetValues] =
    useState<TRegistrationStringQuartetValues>({
      quartet_name: "",
      bio: null,
      photo_file: null,
      members: {
        first_violin_name: "",
        second_violin_name: "",
        viola_name: "",
        cello_name: "",
      },
      audio_materials: [],
      video_materials: [],
      source_of_discovery: "",
      motivation_letter: null,
      email: "",
    });
  const [applicantName, setApplicantName] = useState<string>("");

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;

    const isArrayField =
      name === "audio_materials" || name === "video_materials";
    setComposerValues((prev) => ({
      ...prev,
      [name]: isArrayField
        ? value.split(",").map((item) => item.trim())
        : value,
    }));
    if (
      name === "first_violin_name" ||
      name === "second_violin_name" ||
      name === "viola_name" ||
      name === "cello_name"
    ) {
      setStringQuartetValues((prev) => ({
        ...prev,
        members: {
          ...prev.members,
          [name]: value,
        },
      }));
    } else {
      setStringQuartetValues((prev) => ({
        ...prev,
        [name]: isArrayField
          ? value.split(",").map((item) => item.trim())
          : value,
      }));
    }
  };

  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = evt.target;
    const file = files?.[0] ?? null;

    setComposerValues((prev) => ({
      ...prev,
      [name]: file,
    }));
    setStringQuartetValues((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleResetComposerValues = () => {
    setComposerValues({
      composer_name: "",
      bio: null,
      photo_file: null,
      experience: "",
      audio_materials: [],
      video_materials: [],
      source_of_discovery: "",
      motivation_letter: null,
      email: "",
    });
  };

  const handleResetStringQuartetValues = () => {
    setStringQuartetValues({
      quartet_name: "",
      bio: null,
      photo_file: null,
      members: {
        first_violin_name: "",
        second_violin_name: "",
        viola_name: "",
        cello_name: "",
      },
      audio_materials: [],
      video_materials: [],
      source_of_discovery: "",
      motivation_letter: null,
      email: "",
    });
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    try {
      if (formType === "composer") {
        await preparingComposerData(composerValues);

        setApplicantName(composerValues.composer_name);
        setModalType("success");
        setIsOpen(true);
        setFormType(null);
      }

      if (formType === "string quartet") {
        console.log("stringQuartetValues", stringQuartetValues);
        await preparingStringQuartetData(stringQuartetValues);

        setApplicantName(stringQuartetValues.quartet_name ?? "");
        setModalType("success");
        setIsOpen(true);
        setFormType(null);
      }
    } catch (err) {
      console.log(err);
      setModalType("error");
      setIsOpen(true);
    } finally {
      if (formType === "composer") handleResetComposerValues();
      if (formType === "string quartet") handleResetStringQuartetValues();
    }
  };

  const handleRegistrationComposer = () => setFormType("composer");
  const handleRegistrationStringQuartet = () => setFormType("string quartet");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 3000);
    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  const composerInputs: InputUIProps[] = [
    {
      label: "ФИО",
      name: "composer_name",
      type: "text",
      value: composerValues.composer_name,
      onChange: handleChange,
      variant: "outlined",
      error: composerValues.composer_name ? "" : "Поле должно быть заполненным",
      required: true,
      color: "primary",
      sx: {
        "& .MuiInputBase-input": {
          color: "#FFF", // ��вет текста внутри поля
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff", // ��вет обводки внутри поля
        },
        "& .MuiInputLabel-root": {
          color: "#fff", // Цвет лейбла
        },
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important", // Заменить #000 на нужный background
          WebkitTextFillColor: "#fff !important", // Цвет текста при автозаполнении
        },
        "& input:-webkit-autofill:hover": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
        "& input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
      },
    },
    {
      customLabel: "Биография",
      name: "bio",
      type: "file",
      onChange: handleFileChange,
      variant: "outlined",
      error: composerValues.bio ? "" : "Вы не загрузили биографию",
      required: true,
      color: "primary",
      helperText:
        "Загрузите файл биографии в формате: pdf, doc, docx, odt, rtf, txt, md",
      inputProps: { accept: ".pdf,.doc,.docx,.odt,.rtf,.txt,.md" },
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
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
      },
    },
    {
      customLabel: "Фото",
      name: "photo_file",
      type: "text",
      value: composerValues.photo_file,
      onChange: handleChange,
      variant: "outlined",
      error: composerValues.photo_file ? "" : "Загрузите фотографию",
      required: true,
      color: "primary",
      helperText: "Загрузите фотографию (форматы: JPG, PNG, WEBP)",
      inputProps: { accept: ".jpg,.jpeg,.png,.webp" },
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
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important", // Заменить #000 на нужный background
          WebkitTextFillColor: "#fff !important", // Цвет текста при автозаполнении
        },
        // Можно еще, если нужно:
        "& input:-webkit-autofill:hover": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
        "& input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
      },
    },
    {
      label: "Ссылка/ссылки на аудио",
      name: "audio_materials",
      type: "text",
      value: composerValues.audio_materials,
      onChange: handleChange,
      variant: "outlined",
      error: composerValues.audio_materials
        ? ""
        : "Поле должно быть заполненным",
      required: true,
      color: "primary",
      helperText: "Вставьте ссылку/ссылки через запятую",
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
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important", // Заменить #000 на нужный background
          WebkitTextFillColor: "#fff !important", // Цвет текста при автозаполнении
        },
        // Можно еще, если нужно:
        "& input:-webkit-autofill:hover": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
        "& input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
      },
    },
    {
      label: "Ссылка/ссылки на видео",
      name: "video_materials",
      type: "text",
      value: composerValues.video_materials,
      onChange: handleChange,
      variant: "outlined",
      error: composerValues.video_materials
        ? ""
        : "Поле должно быть заполненным",
      required: true,
      color: "primary",
      helperText: "Вставьте ссылку/ссылки через запятую",
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
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important", // Заменить #000 на нужный background
          WebkitTextFillColor: "#fff !important", // Цвет текста при автозаполнении
        },
        // Можно еще, если нужно:
        "& input:-webkit-autofill:hover": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
        "& input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
      },
    },
    {
      label:
        "Опыт работы с электроакустическим инструментарием (software/hardware)",
      name: "experience",
      type: "text",
      value: composerValues.experience,
      onChange: handleChange,
      variant: "outlined",
      error: composerValues.experience ? "" : "Поле должно быть заполненным",
      required: true,
      color: "primary",
      multiline: true,
      rows: 3,
      sx: {
        "& .MuiInputBase-input": {
          color: "#FFF", // ��вет текста внутри поля
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff", // ��вет обводки внутри поля
        },
        "& .MuiInputLabel-root": {
          color: "#fff", // Цвет лейбла
        },
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important", // Заменить #000 на нужный background
          WebkitTextFillColor: "#fff !important", // Цвет текста при автозаполнении
        },
        "& input:-webkit-autofill:hover": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
        "& input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
      },
    },
    {
      label: "Откуда узнали о лаборатории",
      name: "source_of_discovery",
      type: "text",
      value: composerValues.source_of_discovery,
      onChange: handleChange,
      variant: "outlined",
      error: composerValues.source_of_discovery
        ? ""
        : "Поле должно быть заполненным",
      required: true,
      color: "primary",
      multiline: true,
      rows: 3,
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
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important", // Заменить #000 на нужный background
          WebkitTextFillColor: "#fff !important", // Цвет текста при автозаполнении
        },
        // Можно еще, если нужно:
        "& input:-webkit-autofill:hover": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
        "& input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
      },
    },
    {
      customLabel: "Мотивационное письмо",
      name: "motivation_letter",
      type: "file",
      onChange: handleFileChange,
      variant: "outlined",
      error: composerValues.motivation_letter
        ? ""
        : "Вы не загрузили мотивационное письмо",
      required: true,
      color: "primary",
      helperText: "Загрузите файл в формате: pdf, doc, docx, odt, rtf, txt, md",
      inputProps: { accept: ".pdf,.doc,.docx,.odt,.rtf,.txt,.md" },
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
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
      },
    },
    {
      label: "Адрес электронной почты для обратной связи",
      name: "email",
      type: "text",
      value: composerValues.email,
      onChange: handleChange,
      variant: "outlined",
      error: composerValues.email ? "" : "Поле должно быть заполненным",
      required: true,
      color: "primary",
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
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important", // Заменить #000 на нужный background
          WebkitTextFillColor: "#fff !important", // Цвет текста при автозаполнении
        },
        // Можно еще, если нужно:
        "& input:-webkit-autofill:hover": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
        "& input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
      },
    },
  ];

  const composerButtons: ButtonUIProps[] = [
    {
      buttonText: "Сбросить",
      onClick: handleResetComposerValues,
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
      buttonText: "Отправить заявку",
      type: "submit",
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

  const stringQuartetInputs: InputUIProps[] = [
    {
      label: "Название квартета(если есть)",
      name: "quartet_name",
      type: "text",
      value: stringQuartetValues.quartet_name,
      onChange: handleChange,
      variant: "outlined",
      error: "",
      required: false,
      color: "primary",
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
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important", // Заменить #000 на нужный background
          WebkitTextFillColor: "#fff !important", // Цвет текста при автозаполнении
        },
        // Можно еще, если нужно:
        "& input:-webkit-autofill:hover": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
        "& input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
      },
    },
    {
      customLabel: "Биография",
      name: "bio",
      type: "file",
      onChange: handleFileChange,
      variant: "outlined",
      error: stringQuartetValues.bio ? "" : "Вы не загрузили биографию",
      required: true,
      color: "primary",
      helperText:
        "Загрузите файл биографии в формате: pdf, doc, docx, odt, rtf, txt, md",
      inputProps: { accept: ".pdf,.doc,.docx,.odt,.rtf,.txt,.md" },
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
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
      },
    },
    {
      label: "Ссылка на фото",
      name: "photo_url",
      type: "text",
      value: stringQuartetValues.photo_file,
      onChange: handleChange,
      variant: "outlined",
      error: stringQuartetValues.photo_file ? "" : "Загрузите фотографию",
      required: true,
      color: "primary",
      helperText: "Загрузите фотографию (форматы: JPG, PNG, WEBP)",
      inputProps: { accept: ".jpg,.jpeg,.png,.webp" },
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
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important", // Заменить #000 на нужный background
          WebkitTextFillColor: "#fff !important", // Цвет текста при автозаполнении
        },
        // Можно еще, если нужно:
        "& input:-webkit-autofill:hover": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
        "& input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
      },
    },
    {
      label: "ФИО - первая скрипка",
      name: "first_violin_name",
      type: "text",
      value: stringQuartetValues.members.first_violin_name,
      onChange: handleChange,
      variant: "outlined",
      error: stringQuartetValues.members.first_violin_name
        ? ""
        : "Поле должно быть заполненным",
      required: true,
      color: "primary",
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
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important", // Заменить #000 на нужный background
          WebkitTextFillColor: "#fff !important", // Цвет текста при автозаполнении
        },
        // Можно еще, если нужно:
        "& input:-webkit-autofill:hover": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
        "& input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
      },
    },
    {
      label: "ФИО - вторая скрипка",
      name: "second_violin_name",
      type: "text",
      value: stringQuartetValues.members.second_violin_name,
      onChange: handleChange,
      variant: "outlined",
      error: stringQuartetValues.members.second_violin_name
        ? ""
        : "Поле должно быть заполненным",
      required: true,
      color: "primary",
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
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important", // Заменить #000 на нужный background
          WebkitTextFillColor: "#fff !important", // Цвет текста при автозаполнении
        },
        // Можно еще, если нужно:
        "& input:-webkit-autofill:hover": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
        "& input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
      },
    },
    {
      label: "ФИО - альт",
      name: "viola_name",
      type: "text",
      value: stringQuartetValues.members.viola_name,
      onChange: handleChange,
      variant: "outlined",
      error: stringQuartetValues.members.viola_name
        ? ""
        : "Поле должно быть заполненным",
      required: true,
      color: "primary",
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
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important", // Заменить #000 на нужный background
          WebkitTextFillColor: "#fff !important", // Цвет текста при автозаполнении
        },
        // Можно еще, если нужно:
        "& input:-webkit-autofill:hover": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
        "& input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
      },
    },
    {
      label: "ФИО - виолончель",
      name: "cello_name",
      type: "text",
      value: stringQuartetValues.members.cello_name,
      onChange: handleChange,
      variant: "outlined",
      error: stringQuartetValues.members.viola_name
        ? ""
        : "Поле должно быть заполненным",
      required: true,
      color: "primary",
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
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important", // Заменить #000 на нужный background
          WebkitTextFillColor: "#fff !important", // Цвет текста при автозаполнении
        },
        // Можно еще, если нужно:
        "& input:-webkit-autofill:hover": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
        "& input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
      },
    },
    {
      label: "Ссылка/ссылки на аудио",
      name: "audio_materials",
      type: "text",
      value: composerValues.audio_materials,
      onChange: handleChange,
      variant: "outlined",
      error: composerValues.audio_materials
        ? ""
        : "Поле должно быть заполненным",
      required: true,
      color: "primary",
      helperText: "Вставьте ссылку/ссылки через запятую",
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
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important", // Заменить #000 на нужный background
          WebkitTextFillColor: "#fff !important", // Цвет текста при автозаполнении
        },
        // Можно еще, если нужно:
        "& input:-webkit-autofill:hover": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
        "& input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
      },
    },
    {
      label: "Ссылка/ссылки на видео",
      name: "video_materials",
      type: "text",
      value: composerValues.video_materials,
      onChange: handleChange,
      variant: "outlined",
      error: composerValues.video_materials
        ? ""
        : "Поле должно быть заполненным",
      required: true,
      color: "primary",
      helperText: "Вставьте ссылку/ссылки через запятую",
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
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important", // Заменить #000 на нужный background
          WebkitTextFillColor: "#fff !important", // Цвет текста при автозаполнении
        },
        // Можно еще, если нужно:
        "& input:-webkit-autofill:hover": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
        "& input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
      },
    },
    {
      label: "Откуда узнали о лаборатории",
      name: "source_of_discovery",
      type: "text",
      value: stringQuartetValues.source_of_discovery,
      onChange: handleChange,
      variant: "outlined",
      error: stringQuartetValues.source_of_discovery
        ? ""
        : "Поле должно быть заполненным",
      required: true,
      color: "primary",
      multiline: true,
      rows: 3,
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
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important", // Заменить #000 на нужный background
          WebkitTextFillColor: "#fff !important", // Цвет текста при автозаполнении
        },
        // Можно еще, если нужно:
        "& input:-webkit-autofill:hover": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
        "& input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
      },
    },
    {
      customLabel: "Мотивационное письмо",
      name: "motivation_letter",
      type: "file",
      onChange: handleFileChange,
      variant: "outlined",
      error: stringQuartetValues.motivation_letter
        ? ""
        : "Вы не загрузили мотивационное письмо",
      required: true,
      color: "primary",
      helperText: "Загрузите файл в формате: pdf, doc, docx, odt, rtf, txt, md",
      inputProps: { accept: ".pdf,.doc,.docx,.odt,.rtf,.txt,.md" },
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
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
      },
    },
    {
      label: "Адрес электронной почты для обратной связи",
      name: "email",
      type: "text",
      value: composerValues.email,
      onChange: handleChange,
      variant: "outlined",
      error: composerValues.email ? "" : "Поле должно быть заполненным",
      required: true,
      color: "primary",
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
        "& .MuiInputBase-root": {
          backgroundColor: "#000", // цвет фона input'а или textarea
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important", // Заменить #000 на нужный background
          WebkitTextFillColor: "#fff !important", // Цвет текста при автозаполнении
        },
        // Можно еще, если нужно:
        "& input:-webkit-autofill:hover": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
        "& input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset !important",
          WebkitTextFillColor: "#fff !important",
        },
      },
    },
  ];

  const stringQuartetButtons: ButtonUIProps[] = [
    {
      buttonText: "Сбросить",
      onClick: handleResetStringQuartetValues,
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
      buttonText: "Отправить заявку",
      type: "submit",
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

  return (
    <div className={styles.container}>
      <h2>Подача заявки</h2>
      {!formType && (
        <div className={styles.container__buttons}>
          <ButtonUI
            buttonText="Для композиторов"
            onClick={handleRegistrationComposer}
          />
          <ButtonUI
            buttonText="Для струнных квартетов"
            onClick={handleRegistrationStringQuartet}
          />
        </div>
      )}
      {formType === "composer" && (
        <FormUI
          inputs={composerInputs}
          buttons={composerButtons}
          formName="composer_registration"
          formHeader="Регистрация для композиторов"
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      )}
      {formType === "string quartet" && (
        <FormUI
          inputs={stringQuartetInputs}
          buttons={stringQuartetButtons}
          formName="string_quartet_registration"
          formHeader="Регистрация для струнных квартетов"
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      )}
      {isOpen && modalType === "success" && (
        <ModalUI onClose={handleClose}>
          <h2>
            {applicantName?.trim().length > 0
              ? `${applicantName}, ваша заявка отправлена!`
              : "Ваша заявка отправлена!"}
          </h2>
          <p>
            Результаты будут опубликованы на сайте и в телеграм каналах 27-ого
            августа
          </p>
        </ModalUI>
      )}
      {isOpen && modalType === "error" && (
        <ModalUI onClose={handleClose}>
          <h2>Упс, что-то пошло не так... попробуйте позже!</h2>
        </ModalUI>
      )}
    </div>
  );
};
