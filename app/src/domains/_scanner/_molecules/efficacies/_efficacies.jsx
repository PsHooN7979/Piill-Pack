import S from "./style";
import MO from "../molecule.index";
export default function Efficacies({ medicineList }) {
  return (
    <S.MedicineContainer>
      <S.BlinkingContainer>
        <S.TooltipBox>click!</S.TooltipBox>
      </S.BlinkingContainer>
      {medicineList.map((medicine, index) => (
        <MO.Medicines key={index} medicine={medicine} count={index} />
      ))}
    </S.MedicineContainer>
  );
}
