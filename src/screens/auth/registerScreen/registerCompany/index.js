import { Text, View } from 'react-native-ui-lib';
import {
    StyledButton,
    StyledInput,
    AuthLayout,
} from 'screens/components';
import { Key, User } from 'assets';
import { ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { boxWithShadow } from 'utilities/boxShadow';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from 'react-query';
import { accountApi } from 'apis';
import Toast from 'react-native-simple-toast';
import { LoadingScreen } from 'components';


const isValidEmail = email =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
    );

export const RegisterCompany = () => {
    const navi = useNavigation();
    const {
        isLoading,
        mutate: registerHandler,
        data,
    } = useMutation(accountApi.registerCompanyAccount);

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useForm();

    const onSubmit = values => {
        const companyInfo = {
            email: values.email,
            password: values.password,
            companyName: values.companyName,
            description: values.description,
            employees: values.employees,
            address: values.address
        }
        registerHandler(companyInfo);
    };

    useEffect(() => {
        if (data === undefined) return;
        Toast.show('Register Successfully ');
        setTimeout(() => navi.navigate('Login'), 500);
    }, [data]);

    const password = useRef({});
    password.current = watch('password', '');

    return (
        <>
            {isLoading && <LoadingScreen />}
            <AuthLayout
                contentHeight={'100%'}
            >
                <ScrollView>
                    <View width={'100%'} paddingB-80>
                        <View paddingH-20 paddingT-10>
                            <Text fs18 textBlack font-bold center>
                                Đăng ký tài khoản nhà tuyển dụng
                            </Text>
                            <View paddingT-15 paddingB-20 width={'100%'}>
                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <StyledInput
                                            error={
                                                errors.companyName &&
                                                errors.companyName.message
                                            }
                                            title={'Tên công ty: '}
                                            placeholder={'Tên công ty'}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        />
                                    )}
                                    name="companyName"
                                    rules={{
                                        required: 'Company name is required!',
                                    }}
                                />

                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <StyledInput
                                            error={
                                                errors.email &&
                                                errors.email.message
                                            }
                                            title={'Email: '}
                                            placeholder={'Email'}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        />
                                    )}
                                    name="email"
                                    rules={{
                                        required: 'Email is required!',
                                        maxLength: {
                                            value: 25,
                                            message: 'Email too long!',
                                        },
                                        validate: email => {
                                            if (!isValidEmail(email)) {
                                                return 'Email invalid!';
                                            }
                                        },
                                    }}
                                />

                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <StyledInput
                                            type={'password'}
                                            error={
                                                errors.password &&
                                                errors.password.message
                                            }
                                            title={'Mật khẩu: '}
                                            placeholder={'Mật khẩu'}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        />
                                    )}
                                    name="password"
                                    rules={{
                                        required: 'Password is required!',
                                        minLength: {
                                            value: 6,
                                            message:
                                                'Password must have more than 8 character!',
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'Password too long!',
                                        },
                                    }}
                                />

                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <StyledInput
                                            type={'password'}
                                            error={
                                                errors.confirmPassword &&
                                                errors.confirmPassword.message
                                            }
                                            title={'Nhập lại mật khẩu: '}
                                            placeholder={'Nhập lại mật khẩu'}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        />
                                    )}
                                    name="confirmPassword"
                                    rules={{
                                        required:
                                            'Confirm password is required!',
                                        validate: value =>
                                            value === password.current ||
                                            'Password not match!',
                                    }}
                                />

                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <StyledInput
                                            error={
                                                errors.address &&
                                                errors.address.message
                                            }
                                            title={'Địa chỉ: '}
                                            placeholder={'Địa chỉ'}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        />
                                    )}
                                    name="address"
                                    rules={{ required: 'Address is required!' }}
                                />

                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <StyledInput
                                            error={
                                                errors.employees &&
                                                errors.employees.message
                                            }
                                            title={'Số lượng nhân viên: '}
                                            placeholder={'Số lượng nhân viên'}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        />
                                    )}
                                    name="employees"
                                    rules={{ required: 'Employees is required!' }}
                                />

                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <StyledInput
                                            error={
                                                errors.description &&
                                                errors.description.message
                                            }
                                            title={'Mô tả về công ty: '}
                                            placeholder={'Mô tả về công ty'}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        />
                                    )}
                                    name="description"
                                    rules={{ required: 'Description is required!' }}
                                />
                                <StyledButton
                                    onPress={handleSubmit(onSubmit)}
                                    label={'Đăng ký'}
                                />
                            </View>
                            <View marginT-30>
                                <Text
                                    style={{
                                        width: '100%',
                                        textAlign: 'center',
                                        marginTop: -20,
                                    }}
                                    fs14
                                    textBlack
                                    font-light
                                >
                                    Bạn đã có tài khoản? &nbsp;
                                    <Text
                                        onPress={() => navi.navigate('Login')}
                                        fs14
                                        blue30
                                        font-light
                                    >
                                        Đăng nhập
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </AuthLayout>
        </>
    );
};

const style = StyleSheet.create({
    datePicker: {
        borderStyle: 'solid',
        width: '100%',
        borderWidth: 0,
        borderRadius: 12,
        paddingLeft: 40,
        backgroundColor: '#fff',
        ...boxWithShadow,
        elevation: 12,
        paddingTop: 6,
        paddingBottom: 6,
        zIndex: 1,
    },
});
