import S from "./style";

export default function Title({ text }) {
  return (
    <S.TitleContainer>
      <S.Text variant="body1">
        {text.before}&nbsp;
        <S.StrongText component="span" variant="h6" color="#E8A1A0">
          {text.middle}
        </S.StrongText>
        {text.after}
      </S.Text>
    </S.TitleContainer>
  );
}
