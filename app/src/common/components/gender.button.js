import { useState } from "react";

export default function GenderButton({ onGenderSelect, selectedGender }) {
  const [gender, setGender] = useState(selectedGender);

  const selectGender = (selectedGender) => {
    const booleanGender = selectedGender === "male";
    setGender(selectedGender);
    onGenderSelect(booleanGender);
  };

  return (
    <div className="flex border border-slate-300 rounded-lg overflow-hidden">
      <button
        onClick={() => selectGender("male")}
        className={`flex-1 p-2 ${
          gender === "male" ? "bg-blue-100" : "bg-white"
        }`}
      >
        남성
      </button>
      <button
        onClick={() => selectGender("female")}
        className={`flex-1 p-2 ${
          gender === "female" ? "bg-pink-100" : "bg-white"
        }`}
      >
        여성
      </button>
    </div>
  );
}
