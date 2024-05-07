import React from "react";

const phrases = [
  "필팩이 사진 분석 중",
  "필팩이 처방전 읽는 중",
  "필팩이 식약처 방문 중",
  "필팩이 정리하는 중",
];

export default function useText(isActive, intervalDelay = 500) {
  const [index, setIndex] = React.useState(0);
  const [loadingText, setLoadingText] = React.useState(phrases[0] + ".");

  React.useEffect(() => {
    if (!isActive) {
      setLoadingText(phrases[0]); // Reset to the first phrase when not active
      return;
    }

    const intervalId = setInterval(() => {
      setLoadingText((prevText) => {
        const cleanText = phrases[index]; // Get the base text of the current index
        const dotCount = prevText.length - cleanText.length;
        if (dotCount < 3) {
          return cleanText + ".".repeat(dotCount + 1);
        } else {
          const nextIndex = (index + 1) % phrases.length;
          setIndex(nextIndex);
          return phrases[nextIndex];
        }
      });
    }, intervalDelay);

    return () => clearInterval(intervalId);
  }, [isActive, index, phrases, intervalDelay]);

  return loadingText;
}
