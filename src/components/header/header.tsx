import { Navbar } from "../navbar/navbar"

import styles from './header.module.scss'

export const Header = ({ }) => {
  return (
    <header className={styles.header} >
     <Navbar isHeader/>
    </header>
  )
}