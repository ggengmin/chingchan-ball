import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { initKakao } from './kakao';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import './styles/global.css';

// 인트로 체크 컴포넌트
function IntroChecker() {
  const navigate = useNavigate();
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // 이미 인트로 본 적 있는지 확인
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    
    // 메인 페이지(/)로 접속했을 때만 체크
    if (location.pathname === '/') {
      if (hasSeenIntro) {
        // 이미 봤으면 바로 공들 페이지로
        navigate('/balls', { replace: true });
      }
    }
    
    setChecked(true);
  }, [navigate, location]);

  if (!checked) {
    return <div>Loading...</div>;
  }

  return null;
}

function App() {
  useEffect(() => {
    // 카카오 SDK 초기화
    initKakao();
  }, []);

  return (
    <BrowserRouter>
      <IntroChecker />
      <div className="mobile-container">
        <Routes>
          {/* 메인: 처음이면 인트로, 아니면 자동으로 /balls로 */}
          <Route path="/" element={<Page1 />} />
          
          {/* 공들 페이지 */}
          <Route path="/balls" element={<Page2 />} />
          
          {/* 카카오톡 공유 링크 */}
          <Route path="/praise/:id" element={<Page2 />} />
          
          {/* 404 처리 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;