import { axios } from 'libs';

export const imageApi = {
    uploadImage: async (data) =>
        await axios.post('/upload/upload-image', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
};
