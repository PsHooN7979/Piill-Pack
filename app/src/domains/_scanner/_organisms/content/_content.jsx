import S from "./style";
import M from "../_molecules/molecule.index";
import images from "../../../../constants/image.constant";

export default function Content({ data }) {
  const { medicineList, content } = data;

  return (
    <S.AnalysisSection>
      <S.AnalysisPaper elevation={3} state={!medicineList[0]} loading={true}>
        <S.LoadingImage src={images.loading} />
        <S.AnalysisTitle>{content.text}</S.AnalysisTitle>
      </S.AnalysisPaper>
      <S.AnalysisPaper elevation={3} state={medicineList[0]} loading={false}>
        <S.ShowSection>
          <S.TitleSection>
            <S.MedicineImage src={images.prescription} />
            <S.SequentialText text="내가 받은 처방전은?" />
          </S.TitleSection>
          <M.Efficacies medicineList={medicineList} />
        </S.ShowSection>
        <S.SelectSection>
          <S.SaveButton>필팩에 등록하기</S.SaveButton>
          <S.DetailButton>다시 촬영</S.DetailButton>
        </S.SelectSection>
      </S.AnalysisPaper>
    </S.AnalysisSection>
  );
}
