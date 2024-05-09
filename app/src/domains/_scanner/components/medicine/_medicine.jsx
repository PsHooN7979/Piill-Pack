import images from "../../../../constants/image.constant";
import S from "./style";

export default function Medicine({ medicineList }) {
  return (
    <S.MedicineContainer>
      <S.BlinkingContainer>
        <S.TooltipBox>click!</S.TooltipBox>
      </S.BlinkingContainer>
      {medicineList.map((medicine, index) => (
        <S.EfficacySection key={index}>
          <S.TitleSection>
            <S.TitleText delay={index}>
              {medicine.nameList.length + medicine.title}
            </S.TitleText>
            <S.EfficacyImage delay={index} src={images[medicine.efficacy]} />
          </S.TitleSection>
          <S.NameSection>
            {/* {medicine.nameList.map((name, index) => (
              <div
                key={index}
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
      ))}
    </S.MedicineContainer>
  );
}
