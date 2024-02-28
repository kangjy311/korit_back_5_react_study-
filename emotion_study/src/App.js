
import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import SideBar from './components/SideBar/SideBar';
import SideBarTop from './components/SideBarTop/SideBarTop';
import RootLayout from './components/RootLayout/RootLayout';
import Mypage from './pages/Mypage/Mypage';
import { MENUS } from './constants/menu';
import ImageEx from './pages/imageEx/ImageEx';

function App() {
  return (
    <>
      <Reset />
      <SideBarTop />
      <SideBar />
      <RootLayout>  {/* children 써줘야 Routes들어옴 */}
        <Routes>
          {MENUS.map(menu => <Route key={menu.id} path={menu.path} element={menu.element} />)}
        </Routes>
      </RootLayout>
    </>
  );
}

export default App;
