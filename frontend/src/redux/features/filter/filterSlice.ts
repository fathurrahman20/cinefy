import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  availability?: boolean;
  city?: string;
  // genre?: string;
  theaters?: string[];
}

interface DataState {
  data: FilterState;
}

const initialState: DataState = {
  data: {
    availability: undefined,
    city: undefined,
    // genre: undefined,
    theaters: [],
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<DataState>) => {
      state.data = {
        ...state.data,
        ...action.payload.data,
      };
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
