import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import L from "./logic";
import useCustomNavigate from "../../common/hooks/useCustomNavigate";
import constant from "../../constants/constant";
import images from "../../constants/image.constant";
import ScannerTemplate from "./_scanner.template";
import scannerRepo from "./repositories/scanner.repository";

export default function Scanner() {
  const navigate = useCustomNavigate();

  const [phrases, setPhrases] = React.useState(constant.Phrases);
  const [state, setState] = React.useState(true);
  const [title, setTitle] = React.useState(constant.Title.loading);
  const [content, setContent] = React.useState({
    text: phrases[0],
    count: 0,
  });
  const [data, setData] = React.useState([]);

  const mutateOCR = useMutation({
    mutationFn: scannerRepo.ocr,
  });

  const token = useSelector((state) => state.auth.token);

  React.useEffect(() => {
    async function asyncData() {
      const imageToBase64 = await L().takePhoto();

      const regex = /^data:image\/(png|jpeg|jpg);base64,/;
      let newImageToBase64String = imageToBase64.replace(regex, "");

      if (imageToBase64 === "error")
        newImageToBase64String = images.scanTestImage;

      setState(false);
      await mutateOCR
        .mutateAsync({ newImageToBase64String, token })
        .then((result) => {
          setData(result.data);
          setTitle(constant.Title.find);
        })
        .catch((error) => {
          setTimeout(async () => {
            return navigate.goHome();
          }, 1100);
        });
    }
    asyncData();
  }, []);

  React.useEffect(() => {
    let intervalId;
    if (!state) {
      intervalId = setInterval(() => {
        setContent((prevText) => {
          const cleanText = phrases[content.count];
          const dotCount = prevText.text.length - cleanText.length;
          if (dotCount < 3) {
            const text = cleanText + ".".repeat(Math.max(dotCount + 1, 0));
            return { text: text, count: content.count };
          } else {
            const nextIndex = (content.count + 1) % phrases.length;
            return { text: phrases[nextIndex], count: nextIndex };
          }
        });
      }, 550);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [state, content.count]);

  if (state) return <Box sx={{ height: "100vh", background: "black" }} />;
  return (
    <ScannerTemplate
      set={{ title, content, data, setPhrases, setTitle, setContent }}
    />
  );
}
