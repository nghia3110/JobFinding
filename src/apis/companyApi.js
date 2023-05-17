import { axios } from 'libs';

export const companyApi = {
    getAllCompany: async () => {
        const { data } = await axios.get('/company/get-all');
        return data;
    },
    getCompanyDetail: async (id) => {
        const { data } = await axios.get(`/company/profile`);
        return data;
    },
    getAllCompanyJobs: async () => {
        const data = await axios.get(`/company/jobs`);
        return data;
    },
    getCompanyJobs: async () => {
        const data = await axios.get(`/company/jobs?limit=3`);
        return data;
    },
    getApplicants: async (jobId) => {
        const data = await axios.get(`/company/applicants?jobId=${jobId}`);
        return data;
    },
    createJob: async (data) => axios.post('/company/create-job', data, {
        headers: { 'Content-Type': 'application/json' },
    }),
    updateJob: async (updateData) => axios.put(`/company/update-job`, updateData, {
        headers: { 'Content-Type': 'application/json' },
    }),
    approveJob: async (data) => axios.put(`/company/approve-job`, data, {
        headers: { 'Content-Type': 'application/json' },
    }),
    getNotification: async () => {
        const data = await axios.get('/company/notification');
        return data;
    }
}
