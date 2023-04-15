import { axios } from 'libs';
import { RotationGestureHandler } from 'react-native-gesture-handler';

export const accountApi = {
    registerAccount: async (userInfo) => {
        return fetch('http://192.168.0.103:8000/api/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        }).then(response => response.json())
            .then(data => {
                return data;
            });
    },

    login: async (userInfo) => {
        return fetch('http://192.168.0.103:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        }).then(response => response.json())
            .then(data => {
                if(data.message) {
                    console.log(data)
                    return;
                }
                return data;
            });
    },

    getUserProfile: async () => {
        const data = await axios.get('/user/profile');
        console.log(data)
        return data
    },

    updateuserInfo: async (updatedData) => {
        const data = await axios.post('/user/update-user', updatedData, { headers: { 'Content-Type': 'multipart/form-data' }, });
        console.log(data)
        return data
    },
};
