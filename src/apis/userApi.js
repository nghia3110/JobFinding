import { axios } from 'libs';

export const userApi = {
    getUserProfile: async () => {
        const data = await axios.get('/user/profile');
        return data
    },

    updateuserInfo: async (updatedData) => {
        const data = await axios.put('/user/update-user', updatedData, { headers: { 'Content-Type': 'application/json' }, });
        return data
    },

    applyJob: async data =>
        axios.post('/user/apply-job', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),

    getJobApplied: async () => await axios.get('/user/appliedJobs'),

    updateProfile: async (data) => await axios.put('/user/update-profile', data,
        { headers: { 'Content-Type': 'application/json' } }),

    deleteProfile: async (data) => await axios.post('/user/delete-profile', data,
        { headers: { 'Content-Type': 'application/json' } }),

}
