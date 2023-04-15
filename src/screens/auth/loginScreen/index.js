import { Text, View } from 'react-native-ui-lib';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { User, Key } from 'assets';
import { StyledButton, StyledInput } from 'screens/components';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/auth';
import { useNavigation } from '@react-navigation/native';
import { tokenStorage } from 'utilities';
import { useMutation } from 'react-query';
import { accountApi } from 'apis';
import { LoadingScreen } from 'components';
import { AuthLayout } from 'screens/components/layout/AuthLayout';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const navi = useNavigation();

    const {
        isLoading,
        mutate: loginHandler,
        data,
    } = useMutation(accountApi.login);

    const {
        handleSubmit,
        control,
        formState: { errors },
        getValues,
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = values => {
        const userInfo = {
            email: values.email,
            password: values.password
        }
        loginHandler(userInfo);
    };

    useEffect(() => {
        if (data !== undefined) {
            dispatch(
                setUser({
                    email: getValues('email'),
                    name: data.name
                }),
            );
            tokenStorage.set(data.token);
            setTimeout(() => navi.navigate('Home'), 500);
        }
    }, [data]);

    return (
        <>
            {isLoading && <LoadingScreen />}
            <AuthLayout
                contentHeight={'100%'}
            >
                <View paddingH-20 paddingT-10>
                    <Text fs18 textBlack font-bold center>
                        Log in to your account
                    </Text>
                    <View paddingT-15 paddingB-40 width={'100%'}>
                        <Controller
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <StyledInput
                                    error={
                                        errors.username &&
                                        errors.username.message
                                    }
                                    Icon={User}
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
                                    value: 30,
                                    message: 'Email too long!',
                                },
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Please enter a valid email',
                                },
                            }}
                        />
                        <Controller
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <StyledInput
                                    error={
                                        errors.password &&
                                        errors.password.message
                                    }
                                    Icon={User}
                                    type={'password'}
                                    placeholder={'Password'}
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
                                        'Password must have more than 6 character!',
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Password too long!',
                                },
                            }}
                        />
                        <StyledButton
                            onPress={handleSubmit(onSubmit)}
                            label={'Log in'}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => navi.navigate('ForgotPassword')}
                        >
                            <Text
                                style={style.navigateText}
                                fs14
                                blue30
                                font-light
                            >
                                Forgot the password?
                            </Text>
                        </TouchableOpacity>
                        <Text style={style.labelText}
                            marginT-40
                            fs14
                            font-light
                        >
                            Don't have an account? &nbsp;
                            <Text
                                onPress={() => navi.navigate('Register')}
                                style={style.navigateText}
                                fs14
                                blue30
                                font-light
                            >
                                Sign up
                            </Text>
                        </Text>
                    </View>
                </View>
            </AuthLayout>
        </>
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
