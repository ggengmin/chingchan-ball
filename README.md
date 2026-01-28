# 🎈 칭찬공 (PraiseBall)

눈덩이처럼 커지는 칭찬공 웹 애플리케이션입니다.

## 📱 기능

- ✅ 칭찬 메시지 작성 및 저장
- ✅ 실시간 칭찬 공 애니메이션
- ✅ 카카오톡 공유 기능
- ✅ 모바일 최적화
- ✅ Firebase 실시간 데이터베이스

---

## 🚀 빠른 시작

### 1️⃣ 프로젝트 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000` 열기

---

## 🔥 Firebase 설정 (5분)

### 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름: `praise-ball` 입력
4. Google Analytics 비활성화 (선택)
5. 프로젝트 생성 완료

### 2. Firestore Database 생성

1. 왼쪽 메뉴에서 **"Firestore Database"** 클릭
2. **"데이터베이스 만들기"** 클릭
3. **"테스트 모드에서 시작"** 선택 (나중에 보안 규칙 변경 가능)
4. 위치: `asia-northeast3 (Seoul)` 선택
5. 사용 설정 완료

### 3. 웹 앱 추가

1. 프로젝트 개요 옆 톱니바퀴 ⚙️ > **"프로젝트 설정"**
2. 아래로 스크롤 > **"내 앱"** 섹션
3. 웹 아이콘 `</>` 클릭
4. 앱 닉네임: `praise-ball-web` 입력
5. **"앱 등록"** 클릭
6. Firebase SDK 설정 코드가 나타남

### 4. 환경변수 설정

1. `.env.example` 파일을 `.env`로 복사:
```bash
cp .env.example .env
```

2. `.env` 파일 열고 Firebase 설정값 붙여넣기:
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=praise-ball-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=praise-ball-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=praise-ball-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:xxxxx
```

### 5. 테스트

개발 서버를 재시작하고 칭찬을 작성해보세요!
Firebase Console의 Firestore Database에서 데이터 확인 가능합니다.

---

## 💬 카카오톡 공유 설정 (5분)

### 1. 카카오 개발자 계정 생성

1. [카카오 개발자](https://developers.kakao.com) 접속
2. 카카오 계정으로 로그인

### 2. 애플리케이션 추가

1. **"내 애플리케이션"** 메뉴 클릭
2. **"애플리케이션 추가하기"** 클릭
3. 앱 이름: `칭찬공` 입력
4. 사업자명: 개인 이름 입력
5. 저장

### 3. 플랫폼 설정

1. 생성한 앱 클릭
2. **"플랫폼"** 메뉴 > **"Web 플랫폼 등록"**
3. 사이트 도메인 입력:
   - 개발: `http://localhost:3000`
   - 배포: `https://your-domain.vercel.app`

### 4. JavaScript 키 복사

1. **"앱 키"** 메뉴 클릭
2. **"JavaScript 키"** 복사
3. `.env` 파일에 추가:
```env
VITE_KAKAO_KEY=your_javascript_key_here
```

### 5. 테스트

개발 서버 재시작 후 공 클릭 → "카톡 공유하기" 버튼 테스트

---

## 🌐 Vercel 배포 (무료, 10분)

### 1. GitHub에 코드 업로드

```bash
# Git 초기화
git init
git add .
git commit -m "Initial commit"

# GitHub 저장소 생성 후
git remote add origin https://github.com/your-username/praise-ball.git
git branch -M main
git push -u origin main
```

### 2. Vercel 배포

1. [Vercel](https://vercel.com) 접속 및 GitHub 로그인
2. **"Import Project"** 클릭
3. GitHub에서 `praise-ball` 저장소 선택
4. **"Import"** 클릭

### 3. 환경변수 설정

1. Vercel 프로젝트 설정 > **"Environment Variables"**
2. `.env` 파일의 내용을 모두 추가:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_KAKAO_KEY`

### 4. 배포 완료!

- 자동으로 `https://praise-ball.vercel.app` 같은 도메인 생성
- 카카오 개발자 사이트에 배포 도메인 추가 필수!

### 5. 커스텀 도메인 (선택)

Vercel 프로젝트 설정 > **"Domains"**에서 본인 도메인 연결 가능

---

## 🔧 프로젝트 구조

```
praise-ball/
├── src/
│   ├── pages/
│   │   ├── Page1.jsx          # 인트로 페이지
│   │   ├── Page1.css
│   │   ├── Page2.jsx          # 칭찬 공들 보기
│   │   └── Page2.css
│   ├── components/
│   │   ├── PraiseBall.jsx     # 공 컴포넌트 (애니메이션 + 공유)
│   │   ├── PraiseBall.css
│   │   ├── PraiseModal.jsx    # 칭찬 입력 모달
│   │   └── PraiseModal.css
│   ├── styles/
│   │   └── global.css         # 전역 스타일
│   ├── firebase.js            # Firebase 설정
│   ├── kakao.js               # 카카오 SDK
│   ├── App.jsx                # 메인 앱
│   └── main.jsx               # 엔트리 포인트
├── index.html
├── package.json
├── vite.config.js
├── .env                       # 환경변수 (직접 생성)
└── .env.example               # 환경변수 템플릿
```

---

## 📝 주요 기능 설명

### 1. 인트로 페이지 (Page1)
- 3초 후 자동으로 다음 페이지로 이동
- 부드러운 페이드인 애니메이션

### 2. 칭찬 공들 보기 (Page2)
- Firebase에서 오늘의 칭찬 불러오기
- 공들이 둥둥 떠다니는 애니메이션
- 3초 후 자동으로 칭찬 입력 모달 오픈

### 3. 칭찬 입력 모달 (PraiseModal)
- 칭찬 내용 입력 (최대 100자)
- Firebase에 저장
- 성공 메시지 표시 후 3초 뒤 자동 닫힘

### 4. 칭찬 공 클릭 (PraiseBall)
- 공 클릭 시 확대 모달
- 칭찬 내용 표시
- 카카오톡 공유 버튼

---

## 🎨 커스터마이징

### 색상 변경
`src/components/PraiseBall.jsx`의 `colors` 배열 수정:
```javascript
const colors = [
  '#4FD1C5', // 민트
  '#FBD38D', // 노랑
  '#A0AEC0', // 회색
  '#B794F4', // 보라
  '#F6AD55', // 오렌지
];
```

### 애니메이션 속도 조절
`src/components/PraiseBall.jsx`의 `transition` 수정:
```javascript
transition={{
  duration: 3, // 숫자를 크게 하면 느려짐
  repeat: Infinity,
  ease: 'easeInOut',
}}
```

---

## 🐛 문제 해결

### "Firebase 연결 실패"
- `.env` 파일이 제대로 설정되었는지 확인
- Firebase Console에서 Firestore Database가 생성되었는지 확인
- 개발 서버 재시작 (`Ctrl+C` 후 `npm run dev`)

### "카카오톡 공유가 안됨"
- 카카오 개발자 사이트에서 플랫폼(도메인)이 등록되었는지 확인
- JavaScript 키가 올바른지 확인
- 개발 서버 재시작

### "페이지가 비어있음"
- `npm install` 실행했는지 확인
- 브라우저 콘솔(F12)에서 에러 확인
- Node.js 버전 확인 (18 이상 권장)

---

## 📦 빌드 및 프로덕션

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

---

## 📄 라이센스

MIT License - 자유롭게 사용하세요!

---

## 💡 문의

문제가 있거나 궁금한 점이 있다면 GitHub Issues에 남겨주세요!

**즐거운 칭찬 생활 되세요! 🎈**
