import { axios } from 'libs';

export const cvApi = {
    listAllCv: async () => await axios.get('/cv/get-all'),

    getCvFile: async (id) => {
        const data = await axios.get(`/cv/get-cv-file?id=${id}`)
        return data
    },

    uploadCV: async (data) => await axios.post('/cv/createCV', data,{
        headers: { 'Content-Type': 'multipart/form-data' },
    })
};
