import { useState } from 'react';
import { motion } from 'framer-motion';
import { shareToKakao } from '../kakao';
import './PraiseBall.css';

const colors = [
  '#4FD1C5', // 민트
  '#FBD38D', // 노랑
  '#A0AEC0', // 회색
  '#B794F4', // 보라
  '#F6AD55', // 오렌지
];

export default function PraiseBall({ praise }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const color = colors[Math.floor(Math.random() * colors.length)];

  const handleClick = () => {
    if (!isDragging) {
      setIsExpanded(true);
    }
  };

  const handleShare = () => {
    shareToKakao(praise.id, praise.content);
  };

  // 초기 위치 계산 (px 단위)
  const initialX = (praise.positionX || Math.random() * 70) / 100 * window.innerWidth;
  const initialY = (praise.positionY || Math.random() * 70) / 100 * window.innerHeight;

  return (
    <>
      <motion.div
        className="praise-ball"
        style={{
          position: 'fixed',  // ← absolute에서 fixed로!
          background: color,
        }}
        initial={{
          x: initialX,
          y: initialY,
        }}
        // 드래그 설정 - 화면 전체에서 움직임!
        drag
        dragConstraints={{
          left: 0,
          right: window.innerWidth - 120,
          top: 0,
          bottom: window.innerHeight - 120,
        }}
        dragElastic={0.05}  // ← 약간의 탄성 (자연스러움)
        dragTransition={{
          power: 0.1,
          timeConstant: 200,
        }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setTimeout(() => setIsDragging(false), 100);
        }}
        // 기존 애니메이션
        animate={{
          y: [initialY, initialY - 15, initialY],
          x: [initialX, initialX + 8, initialX - 8, initialX],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="ball-text">{praise.content}</div>
      </motion.div>

      {/* 확대된 공 모달 */}
      {isExpanded && (
        <motion.div
          className="ball-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsExpanded(false)}
        >
          <motion.div
            className="ball-modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="ball-modal-text">"{praise.content}"</p>
            
            <div className="ball-modal-actions">
              <button onClick={handleShare} className="kakao-share-btn">
                카톡 공유하기 💬
              </button>
              <button onClick={() => setIsExpanded(false)} className="close-btn">
                닫기
              </button>
            </div>
            
            <p className="share-guide">
              공 click → 카톡 공유하기
            </p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}