import useSWR from "swr";
import { EventUI } from "../ui/event-ui/event-ui";
import { PreloaderUI } from "../ui/preloader-ui/preloader-ui";
import { SectionLineUI } from "../ui/section-line-ui/section-line-ui";
import styles from "./events.module.scss";
import { fetchEvents } from "../../services/fetcher/fetcher";
import { ButtonUI } from "../ui/button-ui/button-ui";
import { useState } from "react";

import { ModalUI } from "../ui/modal-ui/modal-ui";
import { useTranslation } from "react-i18next";

export const Events = () => {
  const { data, isLoading, error } = useSWR("events", fetchEvents);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const actualEvents = data?.filter((e) => !e.archived) ?? [];
  const archivedEvents = data?.filter((e) => e.archived) ?? [];
  const handleOpenArchive = () => {
    setIsOpen(true);
  };

  if (isLoading) return <PreloaderUI />;
  if (error) return <p>{t("error")}</p>;
  if (!data || data.length === 0) return <p>{t("no_concerts")}</p>;

  return (
    <section id="events" className={styles.events}>
      <h1 className={styles.events__title}>{t("agenda")}</h1>
      <SectionLineUI />
      {actualEvents.length > 0 &&
        actualEvents.map((event) => {
          return <EventUI key={event.id} event={event} />;
        })}
      <ButtonUI
        buttonText={t("concerts_acrchive")}
        onClick={handleOpenArchive}
      />
      <SectionLineUI isForward={false} />
      {isOpen && archivedEvents.length > 0 && (
        <ModalUI onClose={() => setIsOpen(false)}>
          <h2>{t("concerts_acrchive")}</h2>
          {archivedEvents.map((event) => {
            return <EventUI key={event.id} event={event} />;
          })}
          <ButtonUI buttonText={t("close")} onClick={() => setIsOpen(false)} />
        </ModalUI>
      )}
    </section>
  );
};
