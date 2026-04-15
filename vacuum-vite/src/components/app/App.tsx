import { Route, Routes } from "react-router-dom";
import { Home } from "../../pages/home/home";
import { Admin } from "../../pages/admin/admin";
import { useDispatch, useSelector } from "../../services/store/store";
import { checkAuth, userSelector } from "../../features/userSlice.ts/userSlice";
import { useEffect } from "react";
import { AdminEvents } from "../../pages/admin-events/admin-events";
import { AdminMedia } from "../../pages/admin-media/admin-media";
import { AdminGallery } from "../../pages/admin-gallery/admin-gallery";
import { AdminAbout } from "../../pages/admin-about/admin-about";
// import { Laboratory } from "../../pages/laboratory/laboratory";
// import { AdminLaboratory } from "../../pages/admin-laboratory/admin-laboratory";
import { ProtectedRoute } from "../protected-route/protected-route";
import { PreloaderUI } from "../ui/preloader-ui/preloader-ui";

function App() {
  const { initialized } = useSelector(userSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (!initialized) {
    return <PreloaderUI />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/admin/about"
          element={
            <ProtectedRoute>
              <AdminAbout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <ProtectedRoute>
              <AdminEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/media"
          element={
            <ProtectedRoute>
              <AdminMedia />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <ProtectedRoute>
              <AdminGallery />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/admin/laboratory"
          element={
            <ProtectedRoute>
              <AdminLaboratory />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route path="/laboratory" element={<Laboratory />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
