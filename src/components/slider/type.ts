import { TImage, TVideo } from "../../utils/types";

export type SliderProps = {
  content: TVideo[] | TImage[];
  isAutoplay: boolean;
  type: "video" | "image";
};
