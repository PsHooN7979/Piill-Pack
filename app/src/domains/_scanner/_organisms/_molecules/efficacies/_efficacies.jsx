import React from "react";
import S from "./style";
import M from "../molecule.index";
import constant from "../../../../../constants/constant";

export default function Efficacies({
  medicineList,
  set,
  medicines,
  setMedicines,
}) {
  const [state, setState] = React.useState("");

  const mutateOCRSet = constant.efficacySet;

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
    if (efficacy === state) {
      setState("");

      set(false);
    } else {
      setState(efficacy);

      set(true);

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
        if (
          idx === medicineIndex &&
          medicine.efficacy !== "add" &&
          medicine.nameList &&
          medicine.nameList.length > 0
        ) {
          const updatedNameList = medicine.nameList.filter(
            (_, ni) => ni !== nameIndex
          );
          return { ...medicine, nameList: updatedNameList };
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

  const handleAddMedicine = (name, efficacy, count) => {
    const efficacyData = mutateOCRSet.find(
      (item) => item.efficacy === efficacy
    );

    const { title, ko, name: effName } = efficacyData;

    setMedicines((prevMedicines) => {
      const existingMedicineIndex = prevMedicines.findIndex(
        (medicine) => medicine.efficacy === efficacy
      );

      const description =
        "직접 저장하신 " +
        effName +
        "에요. 등록하시면 필팩AI가 의약품을 분석할게요!";

      if (existingMedicineIndex !== -1) {
        const updatedMedicines = [...prevMedicines];
        updatedMedicines[existingMedicineIndex].nameList.push({
          name,
          description: description,
        });
        return updatedMedicines;
      } else {
        const newMedicine = {
          title,
          efficacy,
          ko,
          name: effName,
          nameList: [{ name, description }],
        };
        const updatedMedicines = [...prevMedicines];
        const insertIndex = updatedMedicines.length - 1;
        updatedMedicines.splice(insertIndex, 0, newMedicine);
        return updatedMedicines;
      }
    });
    stateHandler("add", count);
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
          onAddMedicine={handleAddMedicine}
        />
      ))}
    </S.MedicineContainer>
  );
}
