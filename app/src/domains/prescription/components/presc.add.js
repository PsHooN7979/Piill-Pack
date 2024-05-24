import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import icons from "../../../constants/icon";
import images from "../../../constants/image.constant";
import { Autocomplete, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker';
import dayjs from 'dayjs';

export default function PrescAdd({ pill, onSearch, setSearchTerm, prescriptionData, setPrescriptionData, inputRef }) {
  const location = useLocation('');
  const [name, setName] = useState('');
  const [dateRange, setDateRange] = useState([dayjs(), dayjs().add(1, 'day')]);
  const [selectedPills, setSelectedPills] = useState([]);
  const [selectedPill, setSelectedPill] = useState(null); // 선택된 약 상태
  const [searchInput, setSearchInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 검색 결과 박스 열기 상태

  const handleInputName = (e) => {
    setName(e.target.value);
    setPrescriptionData({ ...prescriptionData, name: e.target.value });
  };

  const handleInputPills = (e, newInputValue) => {
    setSearchTerm(newInputValue);
    setSearchInput(newInputValue);
  };

  const handlePillSelect = (event, newValue) => {
    setSelectedPill(newValue);
  };

  const handleRegisterPills = () => {
    if (selectedPill) {
      const updatedPills = [...selectedPills, selectedPill];
      setSelectedPills(updatedPills);
      setPrescriptionData({ ...prescriptionData, medicines: updatedPills });
      setSelectedPill(null); // Clear selected pill after adding
      setSearchInput(''); // Clear input after selection
    }
  };

  const handleRemove = (index) => {
    const newPills = selectedPills.filter((_, idx) => idx !== index);
    setSelectedPills(newPills);
    setPrescriptionData({ ...prescriptionData, medicines: newPills });
  };


  return (
    <div className="pt-10">
      {/* 처방전 이름 컨테이너 */}
      <div>
        <input
          onChange={handleInputName}
          type="text"
          placeholder="처방전 이름"
          value={prescriptionData.name}
          className="border border-gray-300 w-full rounded-lg px-4 py-2  text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
        />
      </div>
      {/* <!-- 처방전 이름 컨테이너 종료 --> */}

      {/* <!-- 약 복용 기간 컨테이너 --> */}
      <div className="flex items-center space-x-2 flex-nowrap py-4">
        <span className="font-bold text-gray-700 shrink-0">
          복용 기간:
        </span>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['MobileDateRangePicker']}>
            <DemoItem component="MobileDateRangePicker">
              <MobileDateRangePicker
                value={dateRange}
                onChange={(newValue) => {
                  setDateRange(newValue);
                  setPrescriptionData({ ...prescriptionData, dateRange: newValue });
                }}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </div>


      {/* 약 복용 기간 컨테이너 종료 */}


      {/* 약 이름 검색 컨테이너 */}

      <div className="flex items-center bg-warn01 rounded-full p-2 mb-3 w-full max-w-md mx-auto shadow-custom01">
        <button className="px-2" onClick={onSearch}>
          {/* <AiOutlineMenu className="text-gray-600 text-xl" /> */}
          <icons.iconTypes.searchIcon style={{ ...icons.baseStyle, ...icons.iconSizes.lg }} />
          {/* 검색 아이콘 */}
        </button>
        <Autocomplete
          freeSolo
          id="autocomplete-search-bar"
          options={pill || []}
          getOptionLabel={(option) => option.ITEM_NAME || "No Name"}
          onInputChange={handleInputPills}
          inputValue={searchInput}
          renderInput={(params) => (
            <TextField
              {...params}
              label="약 이름으로 검색하기"
              variant="outlined"
              size="small"
              inputRef={inputRef}
              onFocus={() => setIsDropdownOpen(true)} // 포커스 시 검색 결과 박스 열기
              onBlur={() => setIsDropdownOpen(false)} // 포커스 해제 시 검색 결과 박스 닫기
            />
          )}
          filterOptions={(options, state) => options.filter(option =>
            option.ITEM_NAME.toLowerCase().includes(state.inputValue.toLowerCase())
          )}
          onChange={handlePillSelect}
          open={isDropdownOpen} // 검색 결과 박스 열림/닫힘 상태
          style={{ width: '100%' }}
        />
        <button onClick={handleRegisterPills} className="px-2">
          <icons.iconTypes.smCheckIcon style={{ ...icons.baseStyle, ...icons.iconSizes.lg }} />
          {/* 등록 아이콘 */}
        </button>
      </div>
      {/* 약 이름 검색 컨테이너 종료 */}

      {/* 등록한 약 목록 컨테이너 */}
      {selectedPills.map((pill, index) => (
        <div key={index} className="flex justify-between items-center bg-white border border-gray-300 w-full rounded-lg px-4 py-2 mb-3">
          <div className="flex items-center">
            <img src={pill.ITEM_IMAGE || images.no_img} alt={pill.ITEM_NAME} className="w-10 h-10 mr-4" />
            <div>
              <div className="font-bold">{pill.ITEM_NAME}</div>
              <div className="text-sm text-gray-600">{pill.ENTP_NAME}</div>
              <div className="text-sm text-gray-600">{pill.CHART}</div>
            </div>
          </div>
          <button
            onClick={() => handleRemove(index)}
            className="text-red-600 hover:text-red-800"
          >
            <icons.iconTypes.deleteIcon style={{ ...icons.baseStyle, ...icons.iconSizes.lg }} />
          </button>
        </div>
      ))}
    </div>


  );
}
