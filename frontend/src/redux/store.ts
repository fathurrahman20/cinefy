import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./features/filter/filterSlice";
import ticketReducer from "./features/ticket/ticketSlice";

const store = configureStore({
  reducer: {
    filter: filterReducer,
    ticket: ticketReducer,
    // posts: postsReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
