import { Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/home/home';
import { Admin } from '../../pages/admin/admin';
import { useDispatch, useSelector } from '../../services/store/store';
import { checkAuth, userSelector } from '../../features/userSlice.ts/userSlice';
import { useEffect } from 'react';

function App() {
  const { user, loading, isAuth } = useSelector(userSelector)
  const dispatch = useDispatch()

  console.log(isAuth)

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
