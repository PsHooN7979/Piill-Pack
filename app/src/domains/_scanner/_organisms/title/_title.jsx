import React, { useState, useEffect } from "react";
import S from "./style";

export default function Title({ title }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const middleDelay = title.before.length * 0.03;
    const afterDelay = middleDelay + title.middle.length * 0.03;

    const updatedData = [
      {
        text: title.before,
        initialDelay: 0,
        isMiddle: false,
        color: "black",
      },
      {
        text: " ",
        initialDelay: title.before.length * 0.03,
        isMiddle: false,
        color: "black",
      },
      {
        text: title.middle,
        initialDelay: middleDelay,
        isMiddle: true,
        color: "#E8A1A0",
      },
      {
        text: title.after,
        initialDelay: afterDelay,
        isMiddle: false,
        color: "black",
      },
    ];

    setData(updatedData);
  }, [title]);

  return (
    <S.Container key={title.before + title.middle + title.after}>
      {data.map((set, setIndex) => (
        <React.Fragment key={setIndex}>
          {set.text.split("").map((char, charIndex) => {
            const charDelay = set.initialDelay + charIndex * 0.05;
            return (
              <S.Text
                key={`${setIndex}-${charIndex}`}
                set={{ ...set, initialDelay: charDelay }}
              >
                {char === " " ? "\u00A0" : char}
              </S.Text>
            );
          })}
        </React.Fragment>
      ))}
    </S.Container>
  );
}
