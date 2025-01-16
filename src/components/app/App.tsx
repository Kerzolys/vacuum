import { Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/home/home';
import { Admin } from '../../pages/admin/admin';
import { useDispatch, useSelector } from '../../services/store/store';
import { checkAuth, userSelector } from '../../features/userSlice.ts/userSlice';
import { useEffect } from 'react';
import { AdminEvents } from '../../pages/admin-events/admin-events';
import { AdminMedia } from '../../pages/admin-media/admin-media';
import { AdminGallery } from '../../pages/admin-gallery/admin-gallery';
import { AdminAbout } from '../../pages/admin-about/admin-about';

function App() {
  const { user, loading, isAuth } = useSelector(userSelector)
  const dispatch = useDispatch()
  // const { data: events, isLoading, isError } = useGetEventsQuery()

  useEffect(() => {
    dispatch(checkAuth())
  }, [isAuth, dispatch])
  return <>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
      <Route path="/admin/about" element={<AdminAbout />}></Route>
      <Route path="/admin/events" element={<AdminEvents />}></Route>
      <Route path="/admin/media" element={<AdminMedia />}></Route>
      <Route path="/admin/gallery" element={<AdminGallery />}></Route>


    </Routes>
  </>
}

export default App;
