import styles from "./footer.module.scss";

export const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer_contacts}>
          <a href="https://t.me/vacuumquartet" target="_blank" rel="noreferrer">
            {tgIcon}
          </a>
          <a
            href="https://www.youtube.com/@vacuumquartet2858"
            target="_blank"
            rel="noreferrer"
          >
            {youtubeIcon}
          </a>
        </div>
        <div className={styles.footer_copyright}>
          <p>2024-{currentYear} Kerzolys Frontend.</p>
        </div>
      </div>
    </footer>
  );
};

const tgIcon = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z"
        fill="#ffffff"
      ></path>{" "}
    </g>
  </svg>
);

const youtubeIcon = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.84499 4.77535C10.4365 4.40822 13.5635 4.40822 16.155 4.77535C18.5096 5.10891 20.3341 6.76142 20.6831 8.54141C21.1056 10.6962 21.1056 13.3038 20.6831 15.4586C20.3341 17.2386 18.5096 18.8911 16.1551 19.2247C13.5635 19.5918 10.4365 19.5918 7.84499 19.2247C5.49049 18.8911 3.666 17.2386 3.31691 15.4586C2.89434 13.3038 2.89438 10.6962 3.31692 8.54142C3.66596 6.76141 5.49048 5.10891 7.84499 4.77535ZM16.4356 2.79512C13.658 2.40163 10.3421 2.40163 7.56446 2.79512C4.54986 3.22219 1.90016 5.37282 1.35429 8.15657C0.881927 10.5655 0.881875 13.4345 1.3543 15.8434C1.90021 18.6272 4.54984 20.7778 7.56446 21.2049C10.3421 21.5984 13.658 21.5984 16.4356 21.2049C19.4502 20.7778 22.0999 18.6272 22.6458 15.8434C23.1181 13.4345 23.1181 10.5655 22.6458 8.15658C22.0999 5.37281 19.4502 3.22219 16.4356 2.79512ZM10.5547 7.16795C10.2478 6.96338 9.8533 6.94431 9.52814 7.11833C9.20299 7.29234 9 7.6312 9 8V16C9 16.3688 9.20299 16.7077 9.52814 16.8817C9.8533 17.0557 10.2478 17.0366 10.5547 16.8321L16.5547 12.8321C16.8329 12.6466 17 12.3344 17 12C17 11.6656 16.8329 11.3534 16.5547 11.1679L10.5547 7.16795ZM14.1972 12L11 14.1315V9.86852L14.1972 12Z"
        fill="#ffffff"
      ></path>{" "}
    </g>
  </svg>
);
