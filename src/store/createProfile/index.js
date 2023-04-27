import { createSlice } from '@reduxjs/toolkit';

const initialProfile = {
    education: [],
    experience: [],
    skill: []
}

const slice = createSlice({
    name: 'createProfile',
    initialState: initialProfile,
    reducers: {
        setEducation: (state, { payload: education }) => {
            state.education = education;
        },
        setExperience: (state, { payload: experience }) => {
            state.experience = experience;
        },
        setSkill: (state, { payload: skill }) => {
            state.skill = skill;
        },
        setProfile: (_, { payload: profile }) => profile,
        resetProfileStore: () => initialProfile
    },
});

export const {
    setCvProfile,
    setEducation,
    setExperience,
    setSkill,
    resetProfileStore,
    setProfile
} = slice.actions;

export const getProfileData = state => state.createProfile;

export default slice.reducer;
