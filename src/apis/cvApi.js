import { axios } from 'libs';

export const cvApi = {
    listAllCv: async () => await axios.get('/cv/get-all'),

    getCvFile: async (id) => {
        const data = await axios.get(`/cv/get-cv-file?id=${id}`)
        return data
    }
};
