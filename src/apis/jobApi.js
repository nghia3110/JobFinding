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
        const { data } = await axios.get(`/job/get-all?${query}`);
        return data;
    },

    getjobDetail: async id => {
        const data = await axios.get(`/job/get-job-detail/${id}`, jsonType);
        return data;
    },

    applyJob: async data =>
        axios.post('/job/apply-job', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),

    getJobFavorite: async query => {
        const { data } = await axios.get('/job/get-job-favorite');
        return data;
    },

    getJobApplied: async query => {
        const listJob = { jobs: [] };
        const { data } = await axios.get('/job/get-job-applies');
        listJob.jobs = data;
        return listJob;
    },
};
