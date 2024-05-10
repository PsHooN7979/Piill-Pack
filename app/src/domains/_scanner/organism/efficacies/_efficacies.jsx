import S from "./style";

export default function Efficacies({ medicineList, Medicines }) {
  return (
    <S.MedicineContainer>
      <S.BlinkingContainer>
        <S.TooltipBox>click!</S.TooltipBox>
      </S.BlinkingContainer>
      {medicineList.map((medicine, index) => (
        <Medicines key={index} medicine={medicine} count={index} />
      ))}
    </S.MedicineContainer>
  );
}
