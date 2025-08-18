import useSWR from "swr";
import { EventUI } from "../ui/event-ui/event-ui";
import { PreloaderUI } from "../ui/preloader-ui/preloader-ui";
import { SectionLineUI } from "../ui/section-line-ui/section-line-ui";
import styles from "./events.module.scss";
import { fetchEvents } from "../../services/fetcher/fetcher";
import { ButtonUI } from "../ui/button-ui/button-ui";
import { useState } from "react";

import { ModalUI } from "../ui/modal-ui/modal-ui";

export const Events = () => {
  const { data, isLoading, error } = useSWR("events", fetchEvents);
  const [isOpen, setIsOpen] = useState(false);
  if (isLoading) return <PreloaderUI />;
  if (error) return <p>Что-то пошло не так, но мы это исправим!</p>;
  if (!data || data.length === 0)
    return <p>Здесь скоро будут разные концерты!</p>;
  const actualEvents = data.filter((e) => e.archived !== true);
  const archivedEvents = data.filter((e) => e.archived === true);
  const handleOpenArchive = () => {
    setIsOpen(true);
  };
  return (
    <section id="events" className={styles.events}>
      <h1 className={styles.events__title}>Events</h1>
      <SectionLineUI />
      {actualEvents.length > 0 &&
        actualEvents.map((event) => {
          return <EventUI key={event.id} event={event} />;
        })}
      <ButtonUI buttonText="Прошедшие концерты" onClick={handleOpenArchive} />
      <SectionLineUI isForward={false} />
      {isOpen && archivedEvents.length > 0 && (
        <ModalUI onClose={() => setIsOpen(false)}>
          <h2>Прошедшие концерты</h2>
          {archivedEvents.map((event) => {
            return <EventUI key={event.id} event={event} />;
          })}
          <ButtonUI buttonText="Закрыть" onClick={() => setIsOpen(false)} />
        </ModalUI>
      )}
    </section>
  );
};
