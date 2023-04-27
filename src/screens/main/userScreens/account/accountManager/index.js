import React from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import { ExpandRight, Heart, Images, UserFill } from 'assets';
import { TouchableOpacity } from 'react-native';
import { StyledButton } from 'screens/components';
import { useDispatch } from 'react-redux';
import { onLogout } from 'store/auth';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from 'hooks';
import { useQuery } from 'react-query';
import { imageApi } from 'apis/imageApi';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const AccountManager = () => {
    const dispatch = useDispatch();
    const navi = useNavigation();
    const { user } = useAuth();
    /* const {
        isLoading,
        mutate: updateAvatarHandler,
        data: responseData,
    } = useMutation(imageApi.uploadImage) */

    return (
        <>
            <View backgroundColor={'#ffffff'} height={'100%'} paddingH-20>
                {user && <View paddingT-40 marginB-20 row centerV>
                    <TouchableOpacity>
                            <Image source={{ uri: user.userInfo.avatar }} style={{
                                borderRadius: 30
                            }} height={60} width={60} />
                    </TouchableOpacity>
                    <View marginL-15>
                        <Text
                            marginB-2
                            fs19
                            font-bold
                            textBlack
                        >{`${user.userInfo.first_name} ${user.userInfo.last_name}`}</Text>
                        <Text marginT-2 fs14 font-medium black50>
                            {user.email}
                        </Text>
                    </View>
                </View>}
                <ProfileOption
                    title={'Thông tin cá nhân'}
                    icon={<Icon name={'user-alt'} size={25} color="#000" />}
                    navigateTo={'UpdateAccountInfo'}
                    params={{ data: user }}
                />
                <ProfileOption
                    title={'Công việc đã ứng tuyển'}
                    icon={<Icon name={'briefcase'} size={25} color="#000" />}
                    navigateTo={'AppliedJobs'}
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
                    //backgroundColor={'#efefef'}
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
