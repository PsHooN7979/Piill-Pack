import images from "../../../../constants/image.constant";
import S from "./style";

export default function Medicines({ medicine, count }) {
  return (
    <S.EfficacySection key={count}>
      <S.TitleSection>
        <S.TitleText delay={count}>
          {medicine.nameList.length + medicine.title}
        </S.TitleText>
        <S.EfficacyImage delay={count} src={images[medicine.efficacy]} />
      </S.TitleSection>
      <S.NameSection>
        {/* {medicine.nameList.map((name, key) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  border: "1px solid black",
                  padding: "6px 9px",
                  margin: "6px",
                  borderRadius: "7px",
                }}
              >
                {name}
              </div>
            ))} */}
      </S.NameSection>
    </S.EfficacySection>
  );
}
