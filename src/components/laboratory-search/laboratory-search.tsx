import { useState } from "react";
import { InputUI } from "../ui/input-ui/input-ui";
import styles from "./laboratory-search.module.scss";
import { InputUIProps } from "../ui/input-ui/type";
import { FormUI } from "../ui/form-ui/form-ui";
import { ButtonUIProps } from "../ui/button-ui/type";
import useSWR from "swr";
import {
  fetchComposerApplications,
  fetchStringQuartetApplications,
} from "../../services/fetcher/fetcher";
import { LabApplicantBlockUI } from "../ui/lab-applicant-block-ui/lab-applicant-block-ui";
import {
  TComposerApplication,
  TStringQuartetApplication,
} from "../../utils/types";

export const LaboratorySearch = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [resultApplications, setResultApplications] = useState<
    (TComposerApplication | TStringQuartetApplication)[]
  >([]);
  const [resultError, setResultError] = useState<string>("");

  const { data: composersData } = useSWR(
    "labComposers",
    fetchComposerApplications
  );

  const { data: quartetsData } = useSWR(
    "labStringQuartets",
    fetchStringQuartetApplications
  );

  const composerNames = composersData?.map((c) => c.composer_name) || [];
  const quartetNames = quartetsData?.map((q) => q.quartet_name) || [];
  const quartetMemberNames =
    quartetsData?.map((q) => Object.values(q.members)).flat() || [];

  const existingNames = [
    ...composerNames,
    ...quartetNames,
    ...quartetMemberNames,
  ];

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setSearchValue(value);
  };

  const handleResetSearcgValue = () => {
    setSearchValue("");
    setResultApplications([]);
    setResultError("");
  };

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    const searchResult = existingNames.filter((n) =>
      n?.toLowerCase().trim().match(searchValue.toLowerCase().trim())
    );

    const searchComposerApplications =
      composersData?.filter((a) => searchResult.includes(a.composer_name)) ||
      [];

    const searchQuartetNameApplications =
      quartetsData?.filter((a) => searchResult.includes(a.quartet_name)) || [];

    const seaarchQuartetMemberNameApplication =
      quartetsData?.filter((a) =>
        Object.values(a.members).some((memberName) =>
          searchResult.includes(memberName)
        )
      ) || [];

    const resultApplications = [
      ...searchComposerApplications,
      ...searchQuartetNameApplications,
      ...seaarchQuartetMemberNameApplication,
    ];
    if (resultApplications.length > 0) {
      setResultApplications(resultApplications);
    } else {
      setResultApplications([]);
      setResultError("Ничего не найдено!");
    }
  };

  const searchInput: InputUIProps[] = [
    {
      label: "Введите ваше имя или название вашего квартета",
      value: searchValue,
      name: "search_value",
      type: "text",
      onChange: handleChange,
      variant: "outlined",
      error: '',
      required: false,
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
  ];

  const searchButtons: ButtonUIProps[] = [
    {
      buttonText: "Сбросить",
      onClick: handleResetSearcgValue,
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
      buttonText: "Найти",
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
      <h3>Поиск по заявкам</h3>
      <p>
        Здесь вы можете найти свою заявку по своему имени или по названию вашего
        квартета/именам участников, чтобы убедится, что ваша заявка успешно была
        отправлена
      </p>
      <p>
        Если вы не нашли свою заявку или вы столкнулись с трудностями или
        проблемами на сайте, то напишите на{" "}
        <a href="mailto: kerzolys@gmail.com">почту</a>. Мы свяжемся с вами в
        кратчайшие сроки!
      </p>
      <div className={styles.container__search}>
        <FormUI
          inputs={searchInput}
          buttons={searchButtons}
          onSubmit={handleSubmit}
          onChange={handleChange}
          extraClass={styles.container__form}
        />
      </div>
      <div className={styles.container__result}>
        {resultApplications.length > 0 ? (
          resultApplications.map((a) => (
            <LabApplicantBlockUI data={a} key={a.id} />
          ))
        ) : (
          <p>{resultError}</p>
        )}
      </div>
    </div>
  );
};
