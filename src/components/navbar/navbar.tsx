import classNames from "classnames"
import { ButtonUI } from "../ui/button-ui/button-ui"

import styles from "./navbar.module.scss"
import { Link, useLocation, useNavigate } from "react-router-dom"

export const Navbar = ({ isHeader, isAdmin, isHorizontal }: { isHeader?: boolean, isAdmin?: boolean, isHorizontal?: boolean }) => {
  const handleScroll = (sectionId: string) => {
    const section = document.querySelector(sectionId)
    if (section) section.scrollIntoView({ behavior: "smooth" })
  }

  const navigate = useNavigate();
  const location = useLocation();

  const adminLinks = [
    { path: "/admin/about", text: "About" },
    { path: "/admin/events", text: "Events" },
    { path: "/admin/media", text: "Media" },
    { path: "/admin/gallery", text: "Gallery" },
    { path: "/", text: "Home" }
  ];

  const filteredLinks = isAdmin && isHorizontal ? adminLinks.filter((link) => link.path !== location.pathname) : adminLinks

  return (
    <div className={classNames({ [styles.navbar]: isHeader, [styles.navbar_footer]: !isHeader, [styles.navbar_admin]: isAdmin, [styles.navbar_admin_horizontal]: isAdmin && isHorizontal })}>
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
        ) :
          (
            <>
              <ButtonUI buttonText="About" onClick={() => handleScroll("#about")} />
              <ButtonUI buttonText="Events" onClick={() => handleScroll("#events")} />
              <ButtonUI buttonText="Media" onClick={() => handleScroll("#media")} />
              <ButtonUI buttonText="Gallery" onClick={() => handleScroll("#gallery")} />
            </>
          )}

    </div>
  )
}