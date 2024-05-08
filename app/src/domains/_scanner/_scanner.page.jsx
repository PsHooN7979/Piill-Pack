//Library
import React from "react";
import { useMutation } from "@tanstack/react-query";

//Logic and Style
import L from "./logic";
import S from "./style";

//Hooks
import useCustomNavigate from "../../common/hooks/useCustomNavigate";

//Constant
import images from "../../constants/image.constant";
import constant from "../../constants/constant";

//Repository
import scannerRepo from "./repositories/scanner.repository";

//Components
import AppBar from "./components/appbar/_appbar";
import Title from "./components/title/title";
import Medicine from "./components/medicine/_medicine";

const testList = [
  {
    efficacy: "painkiller",
    title: "개의 진통제를 찾았어요!",
    nameList: ["아세트아미노펜", "이부프로펜"],
  },
  {
    efficacy: "fever",
    title: "개의 해열제를 찾았어요!",
    nameList: ["파라세타몰", "나프록센", "히히 나 해열제"],
  },
  {
    efficacy: "biotics",
    title: "개의 항생제를 찾았어요!",
    nameList: ["아목시실린", "클라리스로마이신"],
  },
  {
    efficacy: "inflammatory",
    title: "개의 소염제를 찾았어요!",
    nameList: ["디클로페낙", "케토프로펜"],
  },
  {
    efficacy: "asthmatic",
    title: "개의 천식 치료제를 찾았어요!",
    nameList: ["살부타몰", "플루티카손"],
  },
  // {
  //   efficacy: "hypertensive",
  //   title: "개의 고혈압 치료제를 찾았어요!",
  //   nameList: ["로사르탄", "아텐올롤"],
  // },
  // {
  //   efficacy: "diabetic",
  //   title: "개의 당뇨 치료제를 찾았어요!",
  //   nameList: ["메트포르민", "글리메피리드"],
  // },
  // {
  //   efficacy: "histamine",
  //   title: "개의 알레르기 치료제를 찾았어요!",
  //   nameList: ["세티리진", "로라타딘"],
  // },
  // {
  //   efficacy: "depressant",
  //   title: "개의 항우울제를 찾았어요!",
  //   nameList: ["플루옥세틴", "세르트랄린"],
  // },
  // {
  //   efficacy: "antacids",
  //   title: "개의 위산제를 찾았어요!",
  //   nameList: ["오메프라졸", "란소프라졸"],
  // },
  // {
  //   efficacy: "convulsant",
  //   title: "개의 항경련제를 찾았어요!",
  //   nameList: ["발프로산", "카바마제핀"],
  // },
  {
    efficacy: "medicine",
    title: "개의 미분류 의약품이 있어요.",
    nameList: ["몰네필린", "티크로리누스"],
  },
];

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
            setMedicineList(testList);
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
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isNative, content.count]);

  if (!isNative)
    return (
      <S.ScannerContainer>
        <AppBar />
        <Title text={title} />
        <S.AnalysisSection>
          {medicineList.length === 0 ? (
            <S.AnalysisPaper elevation={3}>
              <S.LoadingImage src={images.loading} />
              <S.AnalysisTitle>{content.text}</S.AnalysisTitle>
            </S.AnalysisPaper>
          ) : (
            <S.MedicinePaper elevation={3}>
              <S.ShowSection>
                <S.TitleSection>
                  <S.MedicineImage src={images.prescription} />
                  <S.SequentialText text="내가 받은 처방전은.." />
                </S.TitleSection>
                <Medicine medicineList={medicineList} />
              </S.ShowSection>
              <S.SelectSection>
                <S.SaveButton>필팩에 등록하기</S.SaveButton>
                <S.DetailButton>수정하기</S.DetailButton>
              </S.SelectSection>
            </S.MedicinePaper>
          )}
        </S.AnalysisSection>
      </S.ScannerContainer>
    );

  return <S.ProcessBlack />;
}
