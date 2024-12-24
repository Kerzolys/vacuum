import classNames from "classnames"
import { ButtonUI } from "../ui/button-ui/button-ui"

import styles from "./navbar.module.scss"
import { Link } from "react-router-dom"

export const Navbar = ({ isHeader, isAdmin }: { isHeader?: boolean, isAdmin?: boolean }) => {
  const handleScroll = (sectionId: string) => {
    const section = document.querySelector(sectionId)
    if (section) section.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <div className={classNames({ [styles.navbar]: isHeader, [styles.navbar_footer]: !isHeader, [styles.navbar_admin]: isAdmin })}>
      {isAdmin ? (
        <>
          <Link to={"/admin/about"} >
            <ButtonUI buttonText="About" />
          </Link>
          <Link to={"/admin/events"}>
            <ButtonUI buttonText="Events" />
          </Link>
          <Link to={"/admin/media"}>
            <ButtonUI buttonText="Media" />
          </Link>
          <Link to={"/admin/gallery"}>
            <ButtonUI buttonText="Gallery" />
          </Link>
        </>
      ) : (
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