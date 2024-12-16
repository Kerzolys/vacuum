import { TImage, TVideo } from "../../../utils/types";

export type SliderUIProps = {
  slides: TVideo[] | TImage[];
  type: "video" | "image";
  currentSlide: number;
};
