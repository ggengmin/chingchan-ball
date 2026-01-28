import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Page1.css';

export default function Page1() {
  const navigate = useNavigate();

  useEffect(() => {
    // 3초 후 자동으로 다음 페이지로
    const timer = setTimeout(() => {
      navigate('/balls');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="page1">
      <motion.div
        className="intro-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="intro-title">
          눈덩이처럼 커지는<br />
          <span className="highlight">칭찬공 홈페이지</span>
        </h1>
        
        <motion.p
          className="intro-quote"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          "칭찬이야말로<br />
          나 자신을 발전시킴과 동시에,<br />
          다른 사람과 함께 더불어 살 수 있는<br />
          가장 현명한 선택이자 방법이다"
        </motion.p>

        <motion.div
          className="loading-dots"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span>●</span>
          <span>●</span>
          <span>●</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
