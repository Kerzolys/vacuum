import useSWR from "swr";
import { testImages } from "../../utils/testImages";
import { Slider } from "../slider/slider";

import styles from "./gallery.module.scss";
import { fetchImages } from "../../services/fetcher/fetcher";
import { TImage } from "../../utils/types";

export const Gallery = () => {
  const { data } = useSWR<TImage[]>("images", fetchImages);

  const images = data || [];
  return (
    <section id="gallery" className={styles.gallery}>
      <h1>Gallery</h1>
      <Slider content={images} isAutoplay={false} type="image" />
    </section>
  );
};
