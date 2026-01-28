// 카카오 SDK 초기화
export const initKakao = () => {
  if (window.Kakao && !window.Kakao.isInitialized()) {
    const kakaoKey = import.meta.env.VITE_KAKAO_KEY || 'YOUR_KAKAO_JAVASCRIPT_KEY';
    window.Kakao.init(kakaoKey);
    console.log('✅ 카카오 SDK 초기화 완료');
  }
};

// 카카오톡 공유하기 - 완전히 새로운 구조
export const shareToKakao = (praiseId, content) => {
  if (!window.Kakao) {
    alert('카카오톡 공유 기능을 사용할 수 없습니다.');
    return;
  }

  // List 템플릿으로 변경 (캐시 우회!)
  window.Kakao.Share.sendDefault({
    objectType: 'list',
    headerTitle: '칭찬공',
    headerLink: {
      mobileWebUrl: 'https://chingchan-ball.vercel.app',
      webUrl: 'https://chingchan-ball.vercel.app',
    },
    contents: [
      {
        title: '🎈 따뜻한 칭찬이 도착했어요!',
        description: content,
        imageUrl: 'https://via.placeholder.com/1x1/FFFFFF/FFFFFF',
        imageWidth: 1,
        imageHeight: 1,
        link: {
          mobileWebUrl: 'https://chingchan-ball.vercel.app',
          webUrl: 'https://chingchan-ball.vercel.app',
        },
      },
    ],
    buttons: [
      {
        title: '칭찬 보러가기',
        link: {
          mobileWebUrl: 'https://chingchan-ball.vercel.app',
          webUrl: 'https://chingchan-ball.vercel.app',
        },
      },
    ],
  });
};