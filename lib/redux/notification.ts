import { createSlice } from "@reduxjs/toolkit";

export const notification = createSlice({
  name: "notification",
  initialState: {
    notificationType: "events",
  },
  reducers: {
    setNotificationType(state, action) {
      state.notificationType = action.payload;
    },
  },
});

export const { setNotificationType } = notification.actions;

export default notification.reducer;
