import { Footer } from "../footer/footer";
import { Header } from "../header/header";
import { LayoutProps } from "./type";

import styles from './layout.module.scss'

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className={styles.layout}>
    <Header />
    {children}
    <Footer />
  </div>
}