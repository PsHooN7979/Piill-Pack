import S from "./style";
import M from "../molecule.index";
import React from "react";
export default function Efficacies({ medicineList }) {
  const [state, setState] = React.useState("");
  const [medicines, setMedicines] = React.useState([]);

  const stateHandler = (efficacy, index) => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;

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

  const handleDelete = (medicineIndex, nameIndex) => {
    setMedicines((prevMedicines) => {
      const updatedMedicines = prevMedicines.map((medicine, idx) => {
        if (idx === medicineIndex) {
          if (medicine.efficacy !== "add") {
            if (medicine.nameList && medicine.nameList.length > 0) {
              const updatedNameList = medicine.nameList.filter(
                (_, ni) => ni !== nameIndex
              );
              return { ...medicine, nameList: updatedNameList };
            }
          }
        }
        return medicine;
      });

      return updatedMedicines.filter(
        (medicine) =>
          (medicine.nameList && medicine.nameList.length > 0) ||
          medicine.efficacy === "add"
      );
    });
  };

  React.useEffect(() => {
    setMedicines(medicineList);
  }, [medicineList]);

  const scrollRef = React.useRef(null);

  return (
    <S.MedicineContainer ref={scrollRef}>
      <S.BlinkingContainer>
        <S.TooltipBox state={state}>click!</S.TooltipBox>
      </S.BlinkingContainer>
      {medicines.map((medicine, index) => (
        <M.Medicines
          key={index}
          medicine={medicine}
          handler={stateHandler}
          remove={handleDelete}
          state={state}
          count={index}
        />
      ))}
    </S.MedicineContainer>
  );
}
