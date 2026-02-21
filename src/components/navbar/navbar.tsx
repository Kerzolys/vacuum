import classNames from "classnames";
import { ButtonUI } from "../ui/button-ui/button-ui";

import styles from "./navbar.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
            buttonText="О нас"
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
            buttonText="Афиша"
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
            buttonText="Медиа"
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
            buttonText="Галерея"
            onClick={
              location.pathname === "/"
                ? () => handleScroll("#gallery")
                : () => {
                    navigate("/");
                    handleScroll("#gallery");
                  }
            }
          />
        </>
      )}
    </div>
  );
};
