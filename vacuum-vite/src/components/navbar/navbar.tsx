import classNames from "classnames";
import { ButtonUI } from "../ui/button-ui/button-ui";

import styles from "./navbar.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LangSwitchUI } from "../ui/lang-switcher-ui/lang-switch-ui";

export const Navbar = ({
  isHeader,
  isAdmin,
  isHorizontal,
}: {
  isHeader?: boolean;
  isAdmin?: boolean;
  isHorizontal?: boolean;
}) => {
  const handleScroll = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const adminLinks = [
    { path: "/admin/about", text: "О нас" },
    { path: "/admin/events", text: "Афиша" },
    { path: "/admin/media", text: "Медиа" },
    { path: "/admin/gallery", text: "Галерея" },
    { path: "/", text: "Home" },
  ];

  const filteredLinks =
    isAdmin && isHorizontal
      ? adminLinks.filter((link) => link.path !== location.pathname)
      : adminLinks;

  return (
    <div
      className={classNames({
        [styles.navbar]: isHeader,
        [styles.navbar_footer]: !isHeader,
        [styles.navbar_admin]: isAdmin,
        [styles.navbar_admin_horizontal]: isAdmin && isHorizontal,
      })}
    >
      {isAdmin ? (
        <>
          {filteredLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <ButtonUI buttonText={link.text} />
            </Link>
          ))}
          {isHorizontal && (
            <ButtonUI buttonText="Back" onClick={() => navigate(-1)} />
          )}
        </>
      ) : (
        <>
          <ButtonUI
            buttonText={t("about")}
            onClick={
              location.pathname === "/"
                ? () => handleScroll("#about")
                : () => {
                    navigate("/");
                    handleScroll("#about");
                  }
            }
          />
          <ButtonUI
            buttonText={t("agenda")}
            onClick={
              location.pathname === "/"
                ? () => handleScroll("#events")
                : () => {
                    navigate("/");
                    handleScroll("#events");
                  }
            }
          />
          <ButtonUI
            buttonText={t("media")}
            onClick={
              location.pathname === "/"
                ? () => handleScroll("#media")
                : () => {
                    navigate("/");
                    handleScroll("#media");
                  }
            }
          />
          <ButtonUI
            buttonText={t("gallery")}
            onClick={
              location.pathname === "/"
                ? () => handleScroll("#gallery")
                : () => {
                    navigate("/");
                    handleScroll("#gallery");
                  }
            }
          />
          <LangSwitchUI />
        </>
      )}
    </div>
  );
};
