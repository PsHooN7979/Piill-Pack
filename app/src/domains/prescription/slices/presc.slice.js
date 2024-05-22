import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPrescriptions, addPrescription, searchMedicine } from '../repositories/presc.repository';

// 처방전 데이터를 가져오는 비동기 Thunk 함수 정의
export const fetchPrescriptions = createAsyncThunk(
    'prescriptions/fetchPrescriptions',
    async () => {
        // 처방전 데이터를 가져오는 API 호출
        const response = await getPrescriptions();
        return response.data;
    }
);

export const addNewPrescription = createAsyncThunk(
    'prescriptions/addNewPrescription',
    async (prescriptionData) => {
        const response = await addPrescription(prescriptionData);
        return response;
    }
);

export const fetchMedicine = createAsyncThunk(
    'prescriptions/fetchMedicine',
    async (itemName) => {
        const response = await searchMedicine(itemName);
        return response;
    }
);

// 처방전 상태 관리를 위한 슬라이스 생성
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
            state.list = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
    builder
        // fetchPrescriptions 비동기 작업이 pending 상태일 때 실행되는 리듀서
        .addCase(fetchPrescriptions.pending, (state) => {
        state.status = 'loading';
        })
        // fetchPrescriptions 비동기 작업이 fulfilled 상태일 때 실행되는 리듀서
        .addCase(fetchPrescriptions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.prescriptions = action.payload;
        })
        // fetchPrescriptions 비동기 작업이 rejected 상태일 때 실행되는 리듀서
        .addCase(fetchPrescriptions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        })
        .addCase(addNewPrescription.fulfilled, (state, action) => {
            state.prescriptions.push(action.payload);
        })
        .addCase(fetchMedicine.fulfilled, (state, action) => {
            state.medicines = action.payload;
        });
    },
});

export const { clearPrescriptions } = prescSlice.actions;
export default prescSlice.reducer;
