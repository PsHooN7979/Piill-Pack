//Library
import React from "react";
import { useMutation } from "@tanstack/react-query";
//Logic
import L from "./logic";
//Hooks
import useCustomNavigate from "../../common/hooks/useCustomNavigate";
//Constant
import constant from "../../constants/constant";
import testSet from "../../constants/json.server";
import images from "../../constants/image.constant";
//Repository
import scannerRepo from "./repositories/scanner.repository";
import ScannerTemplate from "./_scanner.template";

export default function Scanner() {
  const navigate = useCustomNavigate();

  const [medicineList, setMedicineList] = React.useState([]);
  const [content, setContent] = React.useState({
    text: constant.Phrases[0],
    count: 0,
  });
  const [isNative, setIsNative] = React.useState(true);
  const [title, setTitle] = React.useState(constant.Title.loading);

  const mutateOCR = useMutation({
    mutationFn: scannerRepo.ocr,
  });

  React.useEffect(() => {
    async function asyncData() {
      const imageToBase64 = await L().takePhoto();

      // if (imageToBase64 === "error") return navigate.goHome();

      setIsNative(false);
      await mutateOCR
        .mutateAsync(imageToBase64)
        .then((result) => {
          setMedicineList(result.data.medicine_list);
          setTitle(constant.Title.find);
        })
        .catch((error) => {
          setTimeout(async () => {
            // return navigate.goHome();

            //test
            setMedicineList(testSet.mutateOCRSet);
            //test
            setTitle(constant.Title.find);
          }, 2100);
        });
    }
    asyncData();
  }, []);

  React.useEffect(() => {
    let intervalId;
    if (!isNative) {
      intervalId = setInterval(() => {
        setContent((prevText) => {
          const cleanText = constant.Phrases[content.count];
          const dotCount = prevText.text.length - cleanText.length;
          if (dotCount < 3) {
            const text = cleanText + ".".repeat(dotCount + 1);
            return { text: text, count: content.count };
          } else {
            const nextIndex = (content.count + 1) % constant.Phrases.length;
            return { text: constant.Phrases[nextIndex], count: nextIndex };
          }
        });
      }, 550);
    } else clearInterval(intervalId);
    return () => clearInterval(intervalId);
  }, [isNative, content.count]);

  const scannerDataSet = { isNative, title, content, images, medicineList };

  return <ScannerTemplate scannerDataSet={scannerDataSet} />;
}
