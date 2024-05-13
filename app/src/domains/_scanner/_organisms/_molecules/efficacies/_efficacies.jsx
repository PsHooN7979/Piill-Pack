import S from "./style";
import M from "../molecule.index";
import React from "react";
export default function Efficacies({ medicineList }) {
  const [state, setState] = React.useState("");
  const [medicines, setMedicines] = React.useState([]);

  const stateHandler = (efficacy, index) => {
    if (efficacy === "medicine") {
      setMedicines((prev) => {
        const newMedicines = [...prev];
        const [selectedMedicine] = newMedicines.splice(index, 1);
        const addIndex = newMedicines.findIndex(
          (med) => med.efficacy === "add"
        );
        if (addIndex !== -1) {
          newMedicines.splice(addIndex, 0, selectedMedicine);
        } else {
          newMedicines.push(selectedMedicine);
        }
        return newMedicines;
      });
    }
    if (efficacy === "add") {
      setMedicines((prev) => {
        const newMedicines = [...prev];
        const [selectedMedicine] = newMedicines.splice(index, 1);

        newMedicines.push(selectedMedicine);
        return newMedicines;
      });
    }
    if (efficacy === state) setState("");
    else {
      setState(efficacy);

      setMedicines((prev) => {
        const newMedicines = [...prev];
        const [selectedMedicine] = newMedicines.splice(index, 1);
        return [selectedMedicine, ...newMedicines];
      });
    }
  };

  React.useEffect(() => {
    setMedicines(medicineList);
  }, [medicineList]);

  return (
    <S.MedicineContainer>
      <S.BlinkingContainer>
        <S.TooltipBox state={state}>click!</S.TooltipBox>
      </S.BlinkingContainer>
      {medicines.map((medicine, index) => (
        <M.Medicines
          key={index}
          medicine={medicine}
          handler={stateHandler}
          state={state}
          count={index}
        />
      ))}
    </S.MedicineContainer>
  );
}
