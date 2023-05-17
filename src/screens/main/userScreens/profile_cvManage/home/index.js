import React from 'react'
import { ScreenLayout } from 'screens/components';
import { ExpandRight } from 'assets';
import { Text, View, TouchableOpacity } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const HomeCv = () => {
    
    return (
        <ScreenLayout title={'CV & Hồ sơ cá nhân'} icon={'arrow-left'} contentHeight={'100%'}>
            <View backgroundColor={'#ffffff'} height={'100%'} paddingH-20>
                <CvSection title={'CV của tôi'} icon={<Icon name={'clipboard-list'} size={25} color="#000" />} navigateTo={'ListCv'}/>
                <CvSection title={'Chỉnh sửa hồ sơ'} icon={<Icon name={'user-edit'} size={25} color="#000" />} navigateTo={'UpdateProfile'}/>
                <CvSection title={'Hồ sơ của tôi'} icon={<Icon name={'user'} size={25} color="#000" />} navigateTo={'ViewProfile'}/>
            </View>
        </ScreenLayout>
    )
};

const CvSection = ({
                       title,
                       icon,
                       navigateTo,
                       params
                   }) => {
    const navi = useNavigation();

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
