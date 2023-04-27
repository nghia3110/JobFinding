import { Text, View } from 'react-native-ui-lib';
import React from 'react';
import { StyleSheet } from 'react-native';
import { StyledButton } from 'screens/components';
import { useNavigation } from '@react-navigation/native';
import { LoadingScreen } from 'components';
import { AuthLayout } from 'screens/components/layout/AuthLayout';

export const SelectRoleScreen = () => {
    const navi = useNavigation();

    return (
        <AuthLayout
            contentHeight={'100%'}
        >
            <View paddingH-20 paddingT-10>
                <Text fs18 textBlack font-bold center>
                    Bạn muốn tạo tài khoản nào?
                </Text>
                <View paddingT-15 paddingB-40 width={'100%'}>
                    <StyledButton
                        onPress={() => { navi.navigate('RegisterUser') }}
                        label={'Người tìm việc'}
                    />
                    <StyledButton
                        onPress={() => { navi.navigate('RegisterCompany') }}
                        label={'Nhà tuyển dụng'}
                    />
                </View>
            </View>
        </AuthLayout>
    );
};

const style = StyleSheet.create({
    navigateText: {
        width: '100%',
        textAlign: 'center',
    },
    labelText: {
        width: '100%',
        textAlign: 'center',
        opacity: 0.5
    }
});
