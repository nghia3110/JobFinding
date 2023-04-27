import React from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import { ExpandRight, Heart, Images, companyFill } from 'assets';
import { TouchableOpacity } from 'react-native';
import { StyledButton } from 'screens/components';
import { useDispatch } from 'react-redux';
import { onLogout } from 'store/auth';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from 'hooks';
import { useQuery } from 'react-query';
import { imageApi } from 'apis/imageApi';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const CompanyProfileManager = () => {
    const dispatch = useDispatch();
    const navi = useNavigation();
    const { company } = useAuth();
    /* const {
        isLoading,
        mutate: updateAvatarHandler,
        data: responseData,
    } = useMutation(imageApi.uploadImage) */

    return (
        <>
            <View backgroundColor={'#ffffff'} height={'100%'} paddingH-20>
                {company && <View paddingT-40 marginB-20 row centerV>
                    <TouchableOpacity>
                        <Image source={{uri: `${company.companyInfo.companyLogo}`}} height={60} width={60} />
                    </TouchableOpacity>
                    <View marginL-15>
                        <Text
                            marginB-2
                            fs19
                            font-bold
                            textBlack
                        >{`${company.companyInfo.companyName}`}</Text>
                        <Text marginT-2 fs14 font-medium black50>
                            {company.email}
                        </Text>
                    </View>
                </View>}
                <ProfileOption
                    title={'Thông tin công ty'}
                    icon={<Icon name={'info-circle'} size={25} color="#000" />}
                    navigateTo={'UpdateProfile'}
                    params={{data: company}}
                />
                
                <View absB width={'100%'} marginL-20 marginB-20>
                    <StyledButton
                        onPress={() => dispatch(onLogout())}
                        label={'Đăng xuất'}
                        bg={'rgba(41, 114, 254, 1)'}
                        color={{ color: '#f1f4ff' }}
                    />
                </View>
            </View>
        </>
    );
};

const ProfileOption = ({ title, icon, navigateTo, params }) => {
    const navi = useNavigation();

    return (
        <TouchableOpacity onPress={() => navi.navigate(navigateTo, params)}>
            <View padding-10 row spread centerV>
                <View row centerV>
                    <View
                        style={{ borderRadius: 12 }}
                        center
                        width={35}
                        height={35}
                        
                    >
                        {icon}
                    </View>
                    <Text marginL-10 fs16 font-medium>
                        {title}
                    </Text>
                </View>
                <ExpandRight />
            </View>
        </TouchableOpacity>
    );
    
};
