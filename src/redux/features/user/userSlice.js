import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
    //   console.log("pyload is : ", action.payload);
      state.data = action.payload.user;
    },
    // userLoggedOut: () => initialState,
    // updateUserState: (state, action) => {
    //   state.user = action.payload;
    // },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
