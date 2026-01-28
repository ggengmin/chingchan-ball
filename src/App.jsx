import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { initKakao } from './kakao';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import './styles/global.css';

function App() {
  useEffect(() => {
    // 카카오 SDK 초기화
    initKakao();
  }, []);

  return (
    <BrowserRouter>
      <div className="mobile-container">
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/balls" element={<Page2 />} />
          {/* 카카오톡 공유 링크를 위한 라우트 */}
          <Route path="/praise/:id" element={<Page2 />} />
          {/* 404 처리 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
