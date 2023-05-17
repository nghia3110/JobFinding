import { axios } from 'libs';
import { RotationGestureHandler } from 'react-native-gesture-handler';

export const accountApi = {
    registerUserAccount: async (userInfo) => {
        /* return fetch('http://192.168.1.183:8000/api/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        }).then(response => response.json())
            .then(data => {
                return data;
            }); */
            const data = await axios.post('/auth/registerUser', userInfo, { headers: { 'Content-Type': 'application/json' }, });
            return data
    },

    registerCompanyAccount: async(companyInfo) => {
        const data = await axios.post('/auth/registerCompany', companyInfo, { headers: { 'Content-Type': 'application/json' }, });
        return data;
    },

    login: async (info) => {
            const data = await axios.post('/auth/login', info, { headers: { 'Content-Type': 'application/json' }, });
            return data;
    },
};
