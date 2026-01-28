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
    // 드래그 중이 아닐 때만 모달 열기
    if (!isDragging) {
      setIsExpanded(true);
    }
  };

  const handleShare = () => {
    shareToKakao(praise.id, praise.content);
  };

  return (
    <>
      <motion.div
        className="praise-ball"
        style={{
          left: `${praise.positionX || Math.random() * 70}%`,
          top: `${praise.positionY || Math.random() * 70}%`,
          background: color,
        }}
        // 드래그 기능 추가
        drag
        dragConstraints={{
          left: -window.innerWidth * 0.4,
          right: window.innerWidth * 0.4,
          top: -window.innerHeight * 0.4,
          bottom: window.innerHeight * 0.4,
        }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          // 드래그 끝난 후 약간의 딜레이
          setTimeout(() => setIsDragging(false), 100);
        }}
        // 기존 애니메이션
        animate={{
          y: [0, -15, 0],
          x: [0, 8, -8, 0],
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