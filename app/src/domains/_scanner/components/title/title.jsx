import S from "./style";

export default function Title({ text }) {
  const { state, before, middle, after } = text;
  const baseDelay = before.length * 0.03;
  const middleDelay = baseDelay + middle.length * 0.03;
  if (state === 1)
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
  if (state === 2)
    return (
      <S.TitleContainer>
        <S.SequentialText text={before} initialDelay={0}></S.SequentialText>
        <>&nbsp;</>
        <S.SequentialText
          text={middle}
          initialDelay={baseDelay}
          variant="h6"
          color="#E8A1A0"
        />
        <S.SequentialText text={after} initialDelay={middleDelay} />
      </S.TitleContainer>
    );
}
