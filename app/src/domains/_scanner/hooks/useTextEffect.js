import React from "react";

const phrases = [
  "필팩이 사진 분석 중",
  "필팩이 처방전 읽는 중",
  "필팩이 식약처 방문 중",
  "필팩이 정리하는 중",
];

export default function useTextEffect(isPending) {
  const [index, setIndex] = React.useState(0);
  const [loadingText, setLoadingText] = React.useState(phrases[0]);

  React.useEffect(() => {
    if (!isPending) {
      setLoadingText(phrases[0]);
      setIndex(0);
      return;
    }

    const intervalId = setInterval(() => {
      setLoadingText((prevText) => {
        const cleanText = phrases[index];
        const dotCount = prevText.length - cleanText.length;
        if (dotCount < 3) {
          return cleanText + ".".repeat(dotCount + 1);
        } else {
          const nextIndex = (index + 1) % phrases.length;
          setIndex(nextIndex);
          return phrases[nextIndex];
        }
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, [isPending, index]);

  return loadingText;
}
