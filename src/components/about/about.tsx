import useSWR from "swr";
import { fetchBio } from "../../services/fetcher/fetcher";
import { ParagraphUI } from "../ui/paragraph-ui/paragraph-ui";
import { SectionLineUI } from "../ui/section-line-ui/section-line-ui";
import styles from "./about.module.scss";
import { PreloaderUI } from "../ui/preloader-ui/preloader-ui";
import { useTranslation } from "react-i18next";

export const About = () => {
  const { data, error, isLoading } = useSWR("bio", fetchBio);
  const { t } = useTranslation();
  const bio = data || [];
  if (isLoading) return <PreloaderUI />;
  if (error) return <p>{t("error")}</p>;
  if (!data || data.length === 0)
    return <p>К сожалению, информация о нас пока недоступна.</p>;
  return (
    <section id="about" className={styles.about}>
      <SectionLineUI />
      {bio.length > 0 &&
        bio
          .sort((a, b) => a.position - b.position)
          .map((bio) => {
            return <ParagraphUI paragraph={bio} key={bio.id} />;
          })}
      <SectionLineUI isForward={false} />
    </section>
  );
};
