import S from "./style";

export default function Title({ isPending }) {
  return (
    <S.TitleContainer>
      {isPending ? (
        <S.Text variant="body1">
          필팩이 처방전을&nbsp;
          <S.StrongText component="span" variant="h6" color="#E8A1A0">
            정리
          </S.StrongText>
          하고 있어요!
        </S.Text>
      ) : (
        <S.Text variant="body1">
          필팩이 처방된 &nbsp;
          <S.StrongText component="span" variant="h6" color="#E8A1A0">
            의약품
          </S.StrongText>
          을 찾았어요!
        </S.Text>
      )}
    </S.TitleContainer>
  );
}
