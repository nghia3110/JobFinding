import { axios } from 'libs';

const jsonType = { headers: { 'Content-Type': 'application/json' } };

export const jobApi = {
    getAllJob: async () => {
        return fetch('http://192.168.0.103:8000/api/job/get-all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                if (data.message) return false;
                return data;
            });
    },

    getRecommendJob: async () => {
        return fetch('http://192.168.0.103:8000/api/job/get-recommend-job', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                if (data.message) return false;
                return data;
            });
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
