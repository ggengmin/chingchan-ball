// 카카오 SDK 초기화
export const initKakao = () => {
  if (window.Kakao && !window.Kakao.isInitialized()) {
    // 🔥 TODO: 카카오 개발자 사이트에서 발급받은 JavaScript 키를 넣으세요!
    const kakaoKey = import.meta.env.VITE_KAKAO_KEY || 'YOUR_KAKAO_JAVASCRIPT_KEY';
    window.Kakao.init(kakaoKey);
    console.log('✅ 카카오 SDK 초기화 완료');
  }
};

// 카카오톡 공유하기
export const shareToKakao = (praiseId, content) => {
  if (!window.Kakao) {
    alert('카카오톡 공유 기능을 사용할 수 없습니다.');
    return;
  }

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '따뜻한 칭찬이 도착했어요!',
      description: content,
      imageUrl: 'https://via.placeholder.com/400x400/4FD1C5/ffffff?text=칭찬공', // 나중에 실제 이미지로 교체
      link: {
        mobileWebUrl: window.location.origin + `/praise/${praiseId}`,
        webUrl: window.location.origin + `/praise/${praiseId}`,
      },
    },
    buttons: [
      {
        title: '칭찬 보러가기',
        link: {
          mobileWebUrl: window.location.origin + `/praise/${praiseId}`,
          webUrl: window.location.origin + `/praise/${praiseId}`,
        },
      },
    ],
  });
};
