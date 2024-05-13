import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import icons from "../../../constants/icon";
import { Autocomplete, TextField } from '@mui/material';



export default function PrescAdd({ pill }) {
  const location = useLocation('');
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pills, setPills] = useState('');
  const [selectedPills, setSelectedPills] = useState([]);

  const items = pill[0].body.items;

  const handleInputName = (e) => {
    setName(e.target.value);
  }

  const handleInputStartDate = (e) => {
    setStartDate(e.target.value);
  }

  const handleInputEndDate = (e) => {
    setEndDate(e.target.value);
  }
  const handleInputPills = (e, newInputValue) => {
    setPills(newInputValue);
    console.log(pills);
  }

  const handleRegisterPills = (event, newValue) => {
    setSelectedPills(prevPills => [...prevPills, newValue]);

    console.log(selectedPills);
    setPills(''); // Clear input after selection
  };

  const handleRemove = (pills) => {
    // filter 메소드를 사용해 해당 인덱스를 제외한 나머지 약 목록을 설정합니다.
    const newPills = pills.filter((_, idx) => idx !== pills);
    setPills(newPills);
  };



  return (
    <div className="pt-10">
      {/* 처방전 이름 컨테이너 */}
      <div>
        <input
          onChange={handleInputName}
          type="text"
          placeholder="처방전 이름"
          className="border border-gray-300 w-full rounded-lg px-4 py-2  text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
        />
      </div>
      {/* <!-- 처방전 이름 컨테이너 종료 --> */}

      {/* <!-- 약 복용 기간 컨테이너 --> */}
      <div className="flex items-center space-x-2 flex-nowrap py-4">
        <span className="font-bold text-gray-700 shrink-0">
          복용 기간:
        </span>
        <input
          onChange={handleInputStartDate}
          type="date"
          className="border border-gray-300 rounded-lg px-4 py-1 text-gray-700 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out min-w-0 flex-1"
        />
        <span className="font-bold text-gray-700 shrink-0">~</span>
        <input
          onChange={handleInputEndDate}
          type="date"
          className="border border-gray-300 rounded-lg px-4 py-1 text-gray-700 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out min-w-0 flex-1"
        />
      </div>


      {/* 약 복용 기간 컨테이너 종료 */}


      {/* 약 이름 검색 컨테이너 */}

      <div className="flex items-center bg-warn01 rounded-full p-2 mb-3 w-full max-w-md mx-auto shadow-custom01">
        <button>
          {/* <AiOutlineMenu className="text-gray-600 text-xl" /> */}
          <icons.iconTypes.searchIcon style={{ ...icons.baseStyle, ...icons.iconSizes.lg }} />
          {/* 검색 아이콘 */}
        </button>
        <Autocomplete
          freeSolo
          id="autocomplete-search-bar"
          options={items}  // Assuming pillData[0] is where your items are located
          getOptionLabel={(option) => option.ITEM_NAME || "No Name"}  // Display the name
          onInputChange={handleInputPills}
          inputValue={pills}
          renderInput={(params) => (
            <TextField {...params} label="약 이름으로 검색하기" variant="outlined" size="small" />
          )}
          filterOptions={(options, state) => {
            // Custom filtering logic, ensure all string manipulations are on valid strings
            return options.filter(option =>
              option.ITEM_NAME.toLowerCase().includes(state.inputValue.toLowerCase())
            );
          }}
          style={{ width: '100%'}}
        />
        <button onClick={handleRegisterPills}>
          <icons.iconTypes.smCheckIcon style={{ ...icons.baseStyle, ...icons.iconSizes.lg }} />
          {/* 등록 아이콘 */}
        </button>
      </div>
      {/* 약 이름 검색 컨테이너 종료 */}

      {/* 등록한 약 목록 컨테이너 */}
      <div className="flex  justify-center items-center border border-gray-400 rounded-lg shadow-custom01 my-2 w-full h-auto">
        <div className="flex items-center w-full p-3">
          {/* 이미지 컨테이너 */}
          <div className='w-10 h-15 flex-shrink-0 px-3'>
            <icons.iconTypes.pillIcon style={{ ...icons.baseStyle, ...icons.iconSizes.lg }} />
          </div>
          {/* 텍스트 컨테이너 */}
          <div className="flex-grow ml-4">
            <div className="text-lg font-semibold w-auto md:w-64 overflow-hidden whitespace-nowrap overflow-ellipsis">
              직접 추가한 약 이름
            </div>
            <div className="text-xs overflow-hidden">
              직접 추가한 약 간단 효과
            </div>
            <div className="text-xs overflow-hidden">
              직접 추가한 약 생김새
            </div>
            <div className="pr-3">
            </div>
          </div>
        </div>
        <button className=" text-xl ml-2 px-3  hover:text-red-600 text-warn02 p-1 inline-flex items-center justify-center focus:outline-none  "
          onClick={() => handleRemove(pills)}>
          <icons.iconTypes.deleteIcon style={{ ...icons.baseStyle, ...icons.iconSizes.lg }} />
        </button>
      </div>



      {/* 등록한 약 목록 컨테이너 종료 */}
    </div>


  );
}
