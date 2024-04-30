import React, { useState } from 'react';

function GenderSelectBtn({ onGenderSelect }) {
  const [gender, setGender] = useState(null);

  const selectGender = (selectedGender) => {
    setGender(selectedGender);
    onGenderSelect(selectedGender);
  };

  return (
    <div className="flex border border-slate-300 rounded-lg overflow-hidden">
      <button
        onClick={() => selectGender('male')}
        className={`flex-1 p-2 ${gender === 'male' ? 'bg-blue-100' : 'bg-white'}`}
      >
        남성
      </button>
      <button
        onClick={() => selectGender('female')}
        className={`flex-1 p-2 ${gender === 'female' ? 'bg-pink-100' : 'bg-white'}`}
      >
        여성
      </button>
    </div>
  );
}

export default GenderSelectBtn;
