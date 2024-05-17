//Style
import S from "./style";
//Organism
import O from "./_organisms/organism.index";

export default function ScannerTemplate({ set }) {
  return (
    <S.Container>
      <O.Header />
      <O.Title title={set.title} />
      <O.Content
        data={{
          content: set.content,
          medicineList: set.data,
          setPhrases: set.setPhrases,
          setTitle: set.setTitle,
          setContent: set.setContent,
        }}
      />
    </S.Container>
  );
}
