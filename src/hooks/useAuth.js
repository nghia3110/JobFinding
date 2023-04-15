import { getUser, getUserInfo } from 'store/auth';
import { useSelector } from 'react-redux';

export const useAuth = () => {
    const user = useSelector(getUser);
    //const userInfo = useSelector(getUserInfo);
    console.log(user)

    return {
        isLogged: !!user,
        user,
        //userInfo
    };
};
