import { getUser, getUserInfo, getCompany } from 'store/auth';
import { useSelector } from 'react-redux';

export const useAuth = () => {
    const user = useSelector(getUser);
    const company = useSelector(getCompany);
    //const userInfo = useSelector(getUserInfo);
    //console.log(user)
    return {
        isLogged: !!user || !!company,
        user,
        company
        //userInfo
    };
};
