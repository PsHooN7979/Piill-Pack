import { createSlice } from '@reduxjs/toolkit';
import { getPrescriptions, addPrescription, searchMedicine } from '../repositories/presc.repository';

const prescSlice = createSlice({
    name: 'prescriptions', // 슬라이스 이름
    initialState: {
        prescriptions: [], // 초기 상태: 빈 배열
        status: 'idle', // 비동기 작업 상태: 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null, // 에러 메시지 초기 상태: null
        medicines: []
    },
    reducers: {
        clearPrescriptions: (state) => {
            state.prescriptions = [];
            state.status = 'idle';
            state.error = null;
        },
        setPrescriptions: (state, action) => {
            console.log("리듀서에서 상태 업데이트:", action.payload); // 추가된 로그
            state.prescriptions = action.payload;
        },
        setMedicines: (state, action) => {
            state.medicines = action.payload;
        }    
    }
});

export const { clearPrescriptions, setPrescriptions, setMedicines } = prescSlice.actions;
export default prescSlice.reducer;