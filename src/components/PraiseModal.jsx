import { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import './PraiseModal.css';

export default function PraiseModal({ onClose, onPraiseSaved }) {
  const [praise, setPraise] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async () => {
    if (!praise.trim()) {
      alert('칭찬 내용을 입력해주세요!');
      return;
    }

    setIsSaving(true);

    try {
      // Firebase에 저장
      await addDoc(collection(db, 'praises'), {
        content: praise,
        createdAt: Timestamp.now(),
        positionX: Math.random() * 70 + 10,
        positionY: Math.random() * 70 + 10,
      });

      // 성공 메시지 표시
      setIsSuccess(true);
      onPraiseSaved();

      // 3초 후 모달 닫기
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('칭찬 저장 실패:', error);
      alert('칭찬 저장에 실패했습니다. Firebase 설정을 확인해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      className="praise-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="praise-modal-content"
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        {!isSuccess ? (
          <>
            <button className="modal-close" onClick={onClose}>
              ✕
            </button>

            <h3 className="modal-title">오늘, 당신이 타인에게<br />한 칭찬은 무엇인가요?</h3>

            <textarea
              className="praise-input"
              placeholder="칭찬 내용을 입력해주세요 💭"
              value={praise}
              onChange={(e) => setPraise(e.target.value)}
              maxLength={100}
              rows={4}
            />

            <div className="char-count">{praise.length}/100</div>

            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={isSaving}
            >
              {isSaving ? '공 날리는 중...' : '🎈 공 날리기'}
            </button>

            <p className="modal-guide">
              버튼을 누르면 칭찬 공이 날아갑니다
            </p>
          </>
        ) : (
          <motion.div
            className="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="success-emoji">🎈✨</div>
            <h3>눈덩이가 커졌습니다!</h3>
            <p>
              오늘, 상대방을 주인공으로<br />
              만들어준 당신은<br />
              더욱 여유롭고, 풍요로운<br />
              하루를 보낼 것입니다 :)
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
