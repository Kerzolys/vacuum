import { Navbar } from "../navbar/navbar"

import styles from './footer.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_navbar}>
        <Navbar isHeader={false}/>
      </div>
      <div className={styles.footer_contacts}>

      </div>
      <div className={styles.footer_copyright}>
        <p>�� 2024 Kerzolys Frontend.</p>
      </div>
    </footer>
  )
}