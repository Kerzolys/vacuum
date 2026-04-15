import Switch from "@mui/material/Switch";
import { useTranslation } from "react-i18next";

export const LangSwitchUI = () => {
  const { i18n } = useTranslation();

  const isRu = i18n.language === "ru";

  const handleChange = () => {
    const nextLang = isRu ? "en" : "ru";
    i18n.changeLanguage(nextLang);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span>🇬🇧</span>

      <Switch checked={isRu} onChange={handleChange} />

      <span>🇷🇺</span>
    </div>
  );
};
