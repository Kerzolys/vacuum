import { Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/home/home';
import { Admin } from '../../pages/admin/admin';

function App() {
  return <>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
    </Routes>
  </>
}

export default App;
