export const shareToKakao = (praiseId, content) => {
  if (!window.Kakao) {
    alert('카카오톡 공유 기능을 사용할 수 없습니다.');
    return;
  }

  window.Kakao.Share.sendDefault({
    objectType: 'text',
    text: `🎈 따뜻한 칭찬이 도착했어요!\n\n"${content}"\n\n칭찬 더 보러 가기 👇`,
    link: {
      mobileWebUrl: 'https://chingchan-ball.vercel.app',
      webUrl: 'https://chingchan-ball.vercel.app',
    },
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