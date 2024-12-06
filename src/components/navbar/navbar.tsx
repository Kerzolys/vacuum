import classNames from "classnames"
import { ButtonUI } from "../ui/button-ui/button-ui"

import styles from "./navbar.module.scss"

export const Navbar = ({isHeader }: {isHeader?: boolean}) => {
  return (
    <div className={classNames({[styles.navbar]:isHeader, [styles.navbar_footer]:!isHeader})}>
      <ButtonUI buttonText="About" />
      <ButtonUI buttonText="Events" />
      <ButtonUI buttonText="Gallery" />
      <ButtonUI buttonText="Media" />
    </div>
  )
}