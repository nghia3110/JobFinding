import { axios } from 'libs';

const jsonType = { headers: { 'Content-Type': 'application/json' } };

export const jobApi = {
    getAllJob: async () => {
        const data  = await axios.get(`/job/get-all`);
        return data;
    },

    getRecommendJob: async () => {
        const data  = await axios.get(`/job/get-recommend-job`);
        return data;
    },
    
    searchJob: async query => {
        const data  = await axios.get(`/job/search-job?${query}`);
        return data;
    },

    getjobDetail: async (id, userId) => {
        const data = await axios.get(`/job/get-job-detail/${id}?userId=${userId}`, jsonType);
        return data;
    },

    getJobFavorite: async query => {
        const { data } = await axios.get('/job/get-job-favorite');
        return data;
    },

};
