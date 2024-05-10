//Style
import S from "./style";
//Organism
import O from "./_organisms/organism.index";

export default function ScannerTemplate({ data }) {
  const { isNative, title, content, images, medicineList } = data;

  if (isNative) return <S.Process />;

  const contentDataSet = { medicineList, images, content };
  return (
    <S.Container image={images.wave}>
      <O.Header image={images.logo} />
      <O.Title title={title} />
      <O.Content data={contentDataSet} />
    </S.Container>
  );
}
