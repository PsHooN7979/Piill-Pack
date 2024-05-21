import S from "./style";
import M from "../_molecules/molecule.index";
import images from "../../../../constants/image.constant";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import scannerRepo from "../../repositories/scanner.repository";
import useCustomNavigate from "../../../../common/hooks/useCustomNavigate";

import constant from "../../../../constants/constant";

export default function Content({ data }) {
  const navigate = useCustomNavigate();
  const { medicineList, content, setPhrases, setTitle, setContent } = data;

  const [isDetail, setIsDetail] = React.useState(false);
  const [medicines, setMedicines] = React.useState([]);

  const mutateAnalysis = useMutation({
    mutationFn: scannerRepo.analysis,
  });
  async function asyncData() {
    setPhrases(constant.Phrases2);
    setContent({
      text: constant.Phrases2[0],
      count: 0,
    });
    setTitle(constant.Title.analysis);
    setMedicines([]);
    await mutateAnalysis
      .mutateAsync(medicineList)
      .then((result) => {})
      .catch((error) => {
        setTimeout(async () => {
          return navigate.goPrescription();
        }, 2100);
      });
  }

  return (
    <S.AnalysisSection>
      <S.AnalysisPaper
        elevation={3}
        state={!medicineList[0] || !medicines[0]}
        loading={true}
      >
        <S.LoadingImage src={images.loading} />
        <S.AnalysisTitle>{content.text}</S.AnalysisTitle>
      </S.AnalysisPaper>
      <S.AnalysisPaper
        elevation={3}
        state={medicineList[0] && medicines[0]}
        loading={false}
      >
        <S.ShowSection>
          <S.TitleSection>
            <S.MedicineImage src={images.prescription} />
            <S.SequentialText text="내가 받은 처방전은?" />
          </S.TitleSection>
          <M.Efficacies
            medicineList={medicineList}
            set={setIsDetail}
            medicines={medicines}
            setMedicines={setMedicines}
          />
        </S.ShowSection>
        <S.SelectSection isDetail={isDetail}>
          <S.SaveButton onClick={() => asyncData()}>
            필팩에 등록하기
          </S.SaveButton>
          <S.DetailButton
            onClick={() => {
              window.location.reload();
            }}
          >
            다시 촬영
          </S.DetailButton>
        </S.SelectSection>
      </S.AnalysisPaper>
    </S.AnalysisSection>
  );
}
