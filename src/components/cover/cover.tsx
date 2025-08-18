import { useNavigate } from "react-router-dom";
import coverimage from "../../assets/images/coverimage-5.png";
import { ButtonUI } from "../ui/button-ui/button-ui";

import styles from "./cover.module.scss";

export const Cover = () => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate("/laboratory");
  return (
    <main className={styles.cover}>
      {/* <div className={styles.cover__video_wrapper}> */}
      {/* <video className={styles.cover__video} autoPlay loop muted controls={false} width="100%">
        <source src="/assets/cover_video.mp4" type="video/mp4" />
      </video> */}
      {/* </div> */}
      <img className={styles.cover__image} src={coverimage} alt="Vacuum Quartet" />
      <h1>Vacuum Quartet Lab</h1>
      <p>20.09 - 30.10</p>
      <ButtonUI buttonText="Info and Registration" onClick={handleNavigate} />
    </main>
  );
};
