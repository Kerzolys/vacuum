
import { Auth } from "../../components/auth/auth";
import { Navbar } from "../../components/navbar/navbar";
import { PreloaderUI } from "../../components/ui/preloader-ui/preloader-ui";
import { loginUser, signUpUser, userSelector } from "../../features/userSlice.ts/userSlice";
import { useSelector } from "../../services/store/store";

import styles from './admin.module.scss'

export const Admin = ({ }) => {
  const { user, loading, isAuth } = useSelector(userSelector)
  console.log(isAuth)
  if(loading) return <PreloaderUI />
  return (
    <div className={styles.container}>
      {/* <Auth action={signUpUser} /> */}
      <h1 className={styles.container_title}>Hello <span className={styles.container_title__email}>{user?.email}</span></h1>
      {isAuth ? <Navbar isAdmin /> : <Auth action={loginUser} />}
    </div>
  );
}