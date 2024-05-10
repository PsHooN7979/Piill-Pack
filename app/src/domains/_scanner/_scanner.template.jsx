//Style
import S from "./style";
//Organism
import O from "./_organisms/organism.index";

export default function ScannerTemplate({ scannerDataSet }) {
  const { isNative, title, content, images, medicineList } = scannerDataSet;

  if (isNative) return <S.Process />;
  return (
    <S.ScannerContainer>
      <O.Header image={images.logo} />
      <O.PageTitle title={title} />
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
            <O.Efficacies medicineList={medicineList} Medicines={O.Medicines} />
          </S.ShowSection>
          <S.SelectSection>
            <S.SaveButton>필팩에 등록하기</S.SaveButton>
            <S.DetailButton>다시 촬영</S.DetailButton>
          </S.SelectSection>
        </S.AnalysisPaper>
      </S.AnalysisSection>
    </S.ScannerContainer>
  );
}
