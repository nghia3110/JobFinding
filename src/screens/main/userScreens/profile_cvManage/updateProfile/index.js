import React, { useEffect } from 'react'
import { ScreenLayout, StyledButton } from 'screens/components';
import { Text, View } from 'react-native-ui-lib';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ExpandRight } from 'assets';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const UpdateProfile = () => {
    return (
        <>
            <ScreenLayout title={'Chỉnh sửa hồ sơ'} icon={'arrow-left'} contentHeight={'100%'}
                          >
                <View backgroundColor={'#ffffff'} height={'100%'} paddingH-20>
                    <CvSection title={'Học vấn'} icon={<Icon name={'book-open'} size={25} color="#000" />} navigateTo={'Education'} params={{type: "", id: ""}}/>
                    <CvSection title={'Kinh nghiệm'} icon={<Icon name={'user-edit'} size={25} color="#000" />} navigateTo={'Experience'} params={{type: "", id: ""}}/>
                    <CvSection title={'Kĩ năng'} icon={<Icon name={'user-edit'} size={25} color="#000" />} navigateTo={'Skill'} params={{type: "", id: ""}}/>
                </View>
            </ScreenLayout>
        </>
    );
}

const CvSection = ({
                       title,
                       icon,
                       navigateTo,
                       params
                   }) => {
    const navi = useNavigation()

    return (
        <TouchableOpacity onPress={() => navi.navigate(navigateTo, params)}>
            <View padding-10 row spread centerV>
                <View row centerV>
                    <View style={{ borderRadius: 12 }} center width={35} height={35}
                          >{icon}</View>
                    <Text marginL-10 fs16 font-medium>{title}</Text>
                </View>
                <ExpandRight/>
            </View>
        </TouchableOpacity>
    )
}
