import { Text, View } from 'react-native-ui-lib';
import {
    StyledButton,
    StyledInput,
    StyledDatePicker,
    AuthLayout,
} from 'screens/components';
import { ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { boxWithShadow } from 'utilities/boxShadow';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from 'react-query';
import { accountApi } from 'apis';
import { Alert, LoadingScreen } from 'components';

const formatDate = date => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [day, month, year].join('/');
};

const isValidEmail = email =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
    );

export const RegisterUser = () => {
    const navi = useNavigation();
    const {
        isLoading,
        isError,
        mutate: registerHandler,
        data,
    } = useMutation(accountApi.registerUserAccount,{
        onError: (error) => {
            console.log('Mutation error:', error.message);
        },
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useForm();

    const onSubmit = values => {
        const userInfo = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            password: values.password,
            dob: formatDate(values.dob),
            phone: values.phoneNumber,
            address: values.address
        }
        registerHandler(userInfo);
    };

    useEffect(() => {
        if (data === undefined) return;
        setTimeout(() => navi.navigate('Login'), 500);
    }, [data]);

    const password = useRef({});
    password.current = watch('password', '');

    return (
        <>
            {isLoading && <LoadingScreen />}
            {isError && <Alert message={'Email đã được sử dụng!'} isSuccess={false} />}
            <AuthLayout
                contentHeight={'100%'}
            >
                <ScrollView>
                    <View width={'100%'} paddingB-80>
                        <View paddingH-20 paddingT-10>
                            <Text fs18 textBlack font-bold center>
                                Đăng ký tài khoản người tìm việc
                            </Text>
                            <View paddingT-15 paddingB-20 width={'100%'}>
                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <StyledInput
                                            error={
                                                errors.first_name &&
                                                errors.first_name.message
                                            }
                                            title={'Tên: '}
                                            placeholder={'Tên'}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        />
                                    )}
                                    name="first_name"
                                    rules={{
                                        required: 'First name is required!',
                                    }}
                                />

                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <StyledInput
                                            error={
                                                errors.last_name &&
                                                errors.last_name.message
                                            }
                                            title={'Họ đệm: '}
                                            placeholder={'Họ'}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        />
                                    )}
                                    name="last_name"
                                    rules={{
                                        required: 'Last name is required!',
                                    }}
                                />
                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <StyledInput
                                            error={
                                                errors.phoneNumber &&
                                                errors.phoneNumber.message
                                            }
                                            title={'Số điện thoại: '}
                                            placeholder={'Số điện thoại'}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        />
                                    )}
                                    name="phoneNumber"
                                    rules={{
                                        required: 'Phone number is required!',
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
                                        <StyledDatePicker
                                            error={
                                                errors.dob && errors.dob.message
                                            }
                                            title={'Ngày sinh: '}
                                            placeholder={'Ngày sinh'}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        />
                                    )}
                                    name="dob"
                                    rules={{ required: 'Age is required!' }}
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
                                    Đã có tài khoản? &nbsp;
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
