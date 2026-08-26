# 김태훈 행정사 홈페이지

GitHub 저장소와 Vercel 배포용 Next.js 패키지입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## Vercel 배포

1. 이 폴더의 파일을 GitHub 새 저장소에 업로드합니다.
2. Vercel에서 **Add New → Project**를 선택합니다.
3. GitHub 저장소를 연결합니다.
4. Framework Preset이 **Next.js**인지 확인하고 Deploy를 누릅니다.

## 상담 저장 API

`/contact`는 브라우저에서 비밀값을 노출하지 않고 `/api/contact`를 거쳐 지정된 저장 API로 문의를 전송합니다.

```bash
CONTACT_FORM_ENDPOINT=https://your-storage-endpoint.example
CONTACT_FORM_SECRET=optional-shared-secret
```

저장 API는 JSON 요청을 받은 뒤 실제 저장에 성공했을 때만 HTTP 2xx와 `{ "success": true }`를 반환해야 합니다. `CONTACT_FORM_ENDPOINT`가 없거나 저장 API가 실패하면 방문자에게 접수 완료를 표시하지 않습니다. Vercel Production 환경변수에 실제 값을 등록한 뒤 재배포해야 합니다.

## 주요 경로

- `/` 메인
- `/about` 행정사 소개
- `/services` 업무 분야 전체보기
- `/services/corporate` 기업·법인 행정
- `/services/immigration-visa` 출입국·비자
- `/services/permits` 각종 인허가
- `/services/appeal` 행정심판·행정처분 구제
- `/contact` 실제 저장 연동 상담 신청
- `/privacy` 개인정보처리방침
