
import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import SideBar from './components/SideBar/SideBar';
import SideBarTop from './components/SideBarTop/SideBarTop';
import RootLayout from './components/RootLayout/RootLayout';
import Mypage from './pages/Mypage/Mypage';

function App() {
  return (
    <>
      <Reset />
      <SideBarTop />
      <SideBar />
      <RootLayout>  {/* children 써줘야 Routes들어옴 */}
        <Routes>
          <Route path='/mypage' element={<Mypage />}/>
          <Route path='/board'element={<>게시판</>}/>
          <Route path='/notice'element={<>공지사항</>}/>
        </Routes>
      </RootLayout>
    </>
  );
}

export default App;
