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

//Repository
import scannerRepo from "./repositories/scanner.repository";

//Components
import AppBar from "./components/appbar/_appbar";
import Title from "./components/title/title";

const phrases = [
  "필팩이 사진 분석 중",
  "필팩이 처방전 읽는 중",
  "필팩이 식약처 방문 중",
  "필팩이 정리하는 중",
];

export default function Scanner() {
  const navigate = useCustomNavigate();

  const [medicineList, setMedicineList] = React.useState([]);
  const [nativeState, setNativeState] = React.useState(true);
  const [content, setContent] = React.useState(phrases[0]);

  const mutateOCR = useMutation({
    mutationFn: scannerRepo.ocr,
  });

  React.useEffect(() => {
    async function asyncData() {
      const imageToBase64 = await L().takePhoto();

      // if (imageToBase64 === "error") return navigate.goHome();

      setNativeState(false);

      await mutateOCR
        .mutateAsync(imageToBase64)
        .then((result) => {
          setMedicineList(result.data.medicine_list);
        })
        .catch((error) => {
          // return navigate.goHome();
        });
    }

    asyncData();

    if (!nativeState) {
    }
  }, []);

  if (nativeState) return <S.ProcessBlack />;
  else
    return (
      <S.ScannerContainer>
        <AppBar />
        <Title isPending={!mutateOCR.isPending} />
        <S.AnalysisSection>
          <S.AnalysisPaper elevation={3}>
            {!mutateOCR.isPending ? (
              <>
                <S.LoadingImage src={images.loading} />
                <S.AnalysisTitle>{content}</S.AnalysisTitle>
              </>
            ) : (
              medicineList.map((medicine, index) => <>test</>)
            )}
          </S.AnalysisPaper>
        </S.AnalysisSection>
      </S.ScannerContainer>
    );
}
