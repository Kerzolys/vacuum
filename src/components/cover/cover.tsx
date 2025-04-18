import coverimage from "../../assets/images/coverimage-5.png";

import styles from "./cover.module.scss";

export const Cover = ({}) => {
  return (
    <main className={styles.cover}>
      {/* <div className={styles.cover__video_wrapper}> */}
      {/* <iframe
          className={styles.cover__video}
          width="100%" height="100%"
          src="https://www.youtube.com/embed/x7XEVYoepzA?autoplay=1&mute=1&controls=0&modestbranding=0&rel=0&showinfo=0"
          allow="autoplay; fullscreen"
          title="Background Video"
        /> */}
      <video className={styles.cover__video} autoPlay loop muted controls={false} width="100%">
        <source src="/assets/cover_video.mp4" type="video/mp4" />
      </video>
      {/* </div> */}
      <img className={styles.cover__image} src={coverimage} />
    </main>
  );
};
