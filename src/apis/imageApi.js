import { axios } from 'libs';

export const imageApi = {
    uploadImage: async data =>
        axios.post('/upload/upload-image', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
};
