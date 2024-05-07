import S from "./style";

export default function Title() {
  return (
    <S.TitleContainer>
      <S.Text variant="body1">
        처방전을
        <S.StrongText component="span" variant="h6" color="#E8A1A0">
          분석
        </S.StrongText>
        하고 있어요
      </S.Text>
    </S.TitleContainer>
  );
}