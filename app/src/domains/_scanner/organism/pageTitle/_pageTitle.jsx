import React from "react";
import S from "./style";

export default function PageTitle({ title }) {
  const [before, setBefore] = React.useState({});
  const [middle, setMiddle] = React.useState({});
  const [after, setAfter] = React.useState({});

  React.useEffect(() => {
    console.log(title);
    const middleDelay = title.before.length * 0.03;
    const afterDelay = middleDelay + middle.length * 0.03;

    setBefore({
      text: title.before,
      initialDelay: 0,
      isMiddle: false,
      color: "black",
    });
    setMiddle({
      text: title.middle,
      initialDelay: middleDelay,
      isMiddle: true,
      color: "#E8A1A0",
    });
    setAfter({
      text: title.after,
      initialDelay: afterDelay,
      isMiddle: false,
      color: "black",
    });
  }, [title]);

  return (
    <S.TitleContainer>
      <S.SequentialText set={before} />
      <S.SequentialText set={middle} />
      <S.SequentialText set={after} />
    </S.TitleContainer>
  );
}
