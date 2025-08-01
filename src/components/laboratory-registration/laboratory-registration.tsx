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
import { PreloaderUI } from "../ui/preloader-ui/preloader-ui";

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
      media_materials: [],
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
      media_materials: [],
      source_of_discovery: "",
      motivation_letter: null,
      email: "",
    });
  const [applicantName, setApplicantName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;

    const isArrayField = name === "media_materials";

    if (formType === "composer") {
      setComposerValues((prev) => ({
        ...prev,
        [name]: isArrayField
          ? value.split(",").map((item) => item.trim())
          : value,
      }));
    }
    if (formType === "string quartet") {
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
    }
  };

  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = evt.target;
    const file = files?.[0] ?? null;

    if (formType === "composer") {
      setComposerValues((prev) => ({
        ...prev,
        [name]: file,
      }));
    }
    if (formType === "string quartet") {
      setStringQuartetValues((prev) => ({
        ...prev,
        [name]: file,
      }));
    }
  };

  const handleResetComposerValues = () => {
    setComposerValues({
      composer_name: "",
      bio: null,
      photo_file: null,
      experience: "",
      media_materials: [],
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
      media_materials: [],
      source_of_discovery: "",
      motivation_letter: null,
      email: "",
    });
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    try {
      if (formType === "composer") {
        setIsLoading(true);
        await preparingComposerData(composerValues);
        setApplicantName(composerValues.composer_name);
        setModalType("success");
        setIsOpen(true);
        setFormType(null);
      }

      if (formType === "string quartet") {
        setIsLoading(true);
        await preparingStringQuartetData(stringQuartetValues);
        setApplicantName(stringQuartetValues.quartet_name ?? "");
        setModalType("success");
        setIsOpen(true);
        setFormType(null);
      }
  
    } catch (err) {
      setModalType("error");
      setIsOpen(true);
    } finally {
      setIsLoading(false);
      if (formType === "composer") handleResetComposerValues();
      if (formType === "string quartet") handleResetStringQuartetValues();
    }
  };

  const handleRegistrationComposer = () => {
    setFormType("composer");
    handleResetStringQuartetValues();
  };

  const handleRegistrationStringQuartet = () => {
    setFormType("string quartet");
    handleResetComposerValues();
  };

  const handleClose = () => setIsOpen(false);

  const isValidEmail = (email: string) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  };

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
      customLabel: "Загрузите фотографию",
      name: "photo_file",
      type: "file",
      onChange: handleFileChange,
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
      label: "Ссылки на аудио/видео материалы",
      name: "media_materials",
      type: "text",
      value: composerValues.media_materials,
      onChange: handleChange,
      variant: "outlined",
      error:
        composerValues.media_materials.length > 0
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
      error: !composerValues.email
        ? "Поле должно быть заполненным"
        : !isValidEmail(composerValues.email)
          ? "Проверьте корректность электронной почты"
          : "",
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
      customLabel: "Загрузите фотографию",
      name: "photo_file",
      type: "file",
      onChange: handleFileChange,
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
      error: stringQuartetValues.members.cello_name
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
      label: "Ссылки на аудио/видео материалы",
      name: "media_materials",
      type: "text",
      value: stringQuartetValues.media_materials,
      onChange: handleChange,
      variant: "outlined",
      error:
        stringQuartetValues.media_materials.length > 0
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
      value: stringQuartetValues.email,
      onChange: handleChange,
      variant: "outlined",
      error: !stringQuartetValues.email
        ? "Поле должно быть заполненным"
        : !isValidEmail(stringQuartetValues.email)
          ? "Проверьте корректность электронной почты"
          : "",
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
        <>
          {isLoading ? (
            <PreloaderUI />
          ) : (
            <>
              <ButtonUI
                buttonText="Назад"
                onClick={() => setFormType(null)}
                className={styles.backButton}
              />
              <FormUI
                inputs={composerInputs}
                buttons={composerButtons}
                formName="composer_registration"
                formHeader="Регистрация для композиторов"
                onSubmit={handleSubmit}
                onChange={handleChange}
              />
            </>
          )}
        </>
      )}
      {formType === "string quartet" && (
        <>
          {isLoading ? (
            <PreloaderUI />
          ) : (
            <>
              <ButtonUI
                buttonText="Назад"
                onClick={() => setFormType(null)}
                className={styles.backButton}
              />
              <FormUI
                inputs={stringQuartetInputs}
                buttons={stringQuartetButtons}
                formName="string_quartet_registration"
                formHeader="Регистрация для струнных квартетов"
                onSubmit={handleSubmit}
                onChange={handleChange}
              />
              {isLoading && <PreloaderUI />}
            </>
          )}
        </>
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
