import { Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/home/home';
import { Admin } from '../../pages/admin/admin';
import { useDispatch, useSelector } from '../../services/store/store';
import { checkAuth, userSelector } from '../../features/userSlice.ts/userSlice';
import { useEffect } from 'react';
import { useGetEventsQuery } from '../../features/events/events';

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
    </Routes>
  </>
}

export default App;
