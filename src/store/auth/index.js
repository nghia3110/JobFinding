import { tokenStorage } from 'utilities';
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'auth',
    initialState: {
        user: undefined,
        userInfo: undefined,
        company: undefined
    },
    reducers: {
        onLogout: state => {
            tokenStorage.clear();
            state.user = undefined;
            state.company = undefined;
        },
        setUser: (state, { payload: user }) => {
            state.user = user;
        },
        setCompany: (state, { payload: company }) => {
            state.company = company;
        },
        setUserInfo: (state, { payload: userInfo }) => {
            state.userInfo = userInfo;
        },
    },
});

export const {
    onLogout,
    setUser,
    setUserInfo,
    setCompany
} = slice.actions;

export const getUser = state => state.auth.user;
export const getCompany = state => state.auth.company;
export const getUserInfo = state => state.auth.user.userInfo;

export default slice.reducer;
