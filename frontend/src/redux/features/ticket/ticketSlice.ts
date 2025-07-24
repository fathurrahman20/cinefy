import type { MovieDetail } from "@/services/global/global.type";
import type { Theater } from "@/services/theater/theater.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Ticket = {
  theater?: Theater;
  time?: string;
  seat?: string[];
};

export interface TicketState {
  step?: "DETAIL" | "THEATER" | "TIME" | "SEAT";
  detail?: Ticket | null;
  movie?: MovieDetail | null;
}

const initialState: TicketState = {
  step: "DETAIL",
  detail: null,
  movie: null,
};

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<TicketState>) => {
      state.step = action.payload.step;
    },
    setTicketDetail: (state, action: PayloadAction<TicketState>) => {
      state.detail = {
        ...state.detail,
        ...action.payload.detail,
      };
    },
    setMovieDetail: (state, action: PayloadAction<TicketState>) => {
      state.movie = action.payload.movie;
    },
  },
});

export const { setStep, setTicketDetail, setMovieDetail } = ticketSlice.actions;

export default ticketSlice.reducer;
