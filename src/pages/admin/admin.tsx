
import { Auth } from "../../components/auth/auth";
import { loginUser, signUpUser, userSelector } from "../../features/userSlice.ts/userSlice";
import { useSelector } from "../../services/store/store";

export const Admin = ({ }) => {
  const { user, loading, isAuth } = useSelector(userSelector)

  return (
    <div>
      <h1>Admin</h1>
      <Auth action={loginUser}/>
      <Auth action={signUpUser} />

    </div>
  );
}