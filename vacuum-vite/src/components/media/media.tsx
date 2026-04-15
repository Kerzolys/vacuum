import { Slider } from "../slider/slider";
import useSWR from "swr";

import styles from "./media.module.scss";
import type { TVideo } from "../../utils/types";
import { fetchVideos } from "../../services/fetcher/fetcher";
import { PreloaderUI } from "../ui/preloader-ui/preloader-ui";
import { convertToEmbedUrl } from "../../features/hooks/convertToEmbed";
import { useTranslation } from "react-i18next";

export const Media = () => {
  const { data, error, isLoading } = useSWR<TVideo[]>("videos", fetchVideos);
  const { t } = useTranslation();

  const updatedData = data?.map((video) => ({
    ...video,
    link: video.link ? convertToEmbedUrl(video.link) : "",
  }));

  if (isLoading) return <PreloaderUI />;
  if (error) return <p>{t("error")}</p>;

  return (
    <section id="media" className={styles.media}>
      {updatedData && (
        <Slider isAutoplay={false} content={updatedData} type="video" />
      )}
    </section>
  );
};
