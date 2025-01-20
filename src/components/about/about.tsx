import useSWR from "swr";
import { fetchBio } from "../../services/fetcher/fetcher";
import { ParagraphUI } from "../ui/paragraph-ui/paragraph-ui";
import { SectionLineUI } from "../ui/section-line-ui/section-line-ui";
import styles from "./about.module.scss";
import { PreloaderUI } from "../ui/preloader-ui/preloader-ui";

export const About = ({}) => {
  const { data, error, isLoading } = useSWR("bio", fetchBio);
  const bio = data || [];
  if (isLoading) return <PreloaderUI />;
  if (error) return <p>Что-то пошло не так, но мы это исправим!</p>;
  if (!data || data.length === 0) return <p>К сожалению, информация о нас пока недоступна.</p>;
  return (
    <section id="about" className={styles.about}>
      <SectionLineUI />
      <h1 className={styles.about__title}>About Us</h1>
      {bio.length > 0 &&
        bio.map((bio) => {
          return <ParagraphUI paragraph={bio} key={bio.id} />;
        })}
      <SectionLineUI isForward={false} />
    </section>
  );
};
