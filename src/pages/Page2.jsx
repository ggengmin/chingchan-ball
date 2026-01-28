import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import PraiseBall from '../components/PraiseBall';
import PraiseModal from '../components/PraiseModal';
import './Page2.css';

export default function Page2() {
  const [praises, setPraises] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // 오늘의 칭찬 불러오기
  const loadTodayPraises = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const q = query(
        collection(db, 'praises'),
        where('createdAt', '>=', Timestamp.fromDate(today))
      );
      
      const snapshot = await getDocs(q);
      const praiseList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setPraises(praiseList);
    } catch (error) {
      console.error('칭찬 불러오기 실패:', error);
      // Firebase 연결 안되어도 데모 데이터 표시
      setPraises([
        { id: '1', content: '오늘도 힘내세요! 💪', positionX: 20, positionY: 30 },
        { id: '2', content: '당신은 멋져요! ✨', positionX: 60, positionY: 50 },
        { id: '3', content: '최고예요! 🌟', positionX: 40, positionY: 70 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodayPraises();
    
    // 3초 후 모달 자동 오픈
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handlePraiseSaved = () => {
    loadTodayPraises(); // 새 칭찬 추가 후 다시 불러오기
  };

  return (
    <div className="page2">
      <div className="page2-header">
        <h2>오늘의 칭찬 공들</h2>
        <p className="praise-count">총 {praises.length}개의 칭찬 🎈</p>
      </div>

      <div className="balls-container">
        {loading ? (
          <div className="loading-text">칭찬 공들을 불러오는 중...</div>
        ) : praises.length === 0 ? (
          <div className="empty-text">
            아직 오늘의 첫 칭찬이 없어요.<br />
            첫 번째 칭찬을 남겨주세요! 🎈
          </div>
        ) : (
          praises.map((praise) => (
            <PraiseBall
              key={praise.id}
              praise={praise}
            />
          ))
        )}
      </div>

      {/* 칭찬 입력 모달 */}
      {showModal && (
        <PraiseModal
          onClose={() => setShowModal(false)}
          onPraiseSaved={handlePraiseSaved}
        />
      )}

      {/* 모달 다시 열기 버튼 */}
      {!showModal && (
        <button 
          className="add-praise-btn"
          onClick={() => setShowModal(true)}
        >
          ➕ 칭찬 추가하기
        </button>
      )}
    </div>
  );
}
