import S from "./scan.style";
import N from "../../../../common/hooks/useCustomNavigate";

export default function Scan() {
  return (
    <S.Container onClick={N().goPrescription}>
      <S.TextContainer>
        <S.TextBox>진단서</S.TextBox>
        <S.TextBox>스캔하기</S.TextBox>
      </S.TextContainer>
      <S.CameraIcon />
    </S.Container>
  );
}

//버튼 -> 화면 넘기고 -> 카메라를 실행 -> 촬영 앨범 저장 -> 풀 패스를 받고
// -> 바이너리로 읽어오고 -> 네이버 클로바 api (OCR) -> 백엔드에서 ocr로 약 정보 추출(식약처 API) 후 프론트로 전달
// 전달받은 약 정보를 사용자에게 결과 화면
