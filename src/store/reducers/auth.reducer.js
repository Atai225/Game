import {
	createSlice
} from "@reduxjs/toolkit";


const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
	},
	reducers: {
		loginUser: (state, action) => {
			state.user = action.payload;
		},
		removeUser: (state) => {
			state.user = null;
		},
	}

})
export default authSlice.reducer;
export const { loginUser, removeUser} = authSlice.actions