import { Navigate } from "react-router-dom";
import { useSelector } from "../../services/store/store";
import { userSelector } from "../../features/userSlice.ts/userSlice";
import { PreloaderUI } from "../ui/preloader-ui/preloader-ui";

type Props = {
  children: JSX.Element;
};

export const ProtectedRoute = ({ children }: Props) => {
  const { isAuth, loading } = useSelector(userSelector);

  if (loading) return <PreloaderUI />;

  return isAuth ? children : <Navigate to="/admin" replace />;
};
