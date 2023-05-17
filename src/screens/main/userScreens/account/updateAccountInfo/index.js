import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { userApi } from 'apis';
import { LoadingScreen } from 'components';
import { StyledButton, StyledInput, StyledDatePicker } from 'screens/components';
import { setUser } from 'store/auth';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native';

const toDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return new Date(year, month - 1, day)
}

const formatDate = (date) => {
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
}

export const UpdateAccountInfo = ({ route }) => {
    const { data } = route.params;
    const navi = useNavigation();
    const dispatch = useDispatch();

    const {
        isLoading,
        mutate: updateInfoHandler,
        data: responseData,
    } = useMutation(userApi.updateuserInfo)

    const {
        handleSubmit,
        control,
        formState: {
            errors,
        },
    } = useForm({
        defaultValues: {
            email: data.email,
            firstName: data.userInfo.first_name,
            lastName: data.userInfo.last_name,
            dob: toDate(data.userInfo.dob.slice(0, 10)),
            phoneNumber: data.userInfo.phone,
            address: data.userInfo.address,
        }
    });

    const onSubmit = (values) => {
        const userInfo = {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email !== data.email ? values.email : '',
            dob: formatDate(values.dob),
            phone: values.phoneNumber,
            address: values.address
        }
        updateInfoHandler(userInfo);
    }

    useEffect(() => {
        if (responseData === undefined) return;
        if (responseData.account !== undefined) {
            dispatch(setUser({
                ...data,
                email: responseData.account.email,
                userInfo: {
                    ...data.userInfo,
                    first_name: responseData.user.first_name,
                    last_name: responseData.user.last_name,
                    address: responseData.user.address,
                    phone: responseData.user.phone,
                    dob: responseData.user.dob
                }
            }))
        } else {
            dispatch(setUser({
                ...data,
                userInfo: {
                    ...data.userInfo,
                    first_name: responseData.user.first_name,
                    last_name: responseData.user.last_name,
                    address: responseData.user.address,
                    phone: responseData.user.phone,
                    dob: responseData.user.dob
                }
            }))
        }
        setTimeout(() => { navi.navigate('Account') }, 500);
    }, [responseData])

    return (
        <>
            {isLoading && <LoadingScreen />}
            <View backgroundColor={'#ffffff'} height={'100%'}>
                <View paddingT-40 paddingL-20 marginB-20 row centerV>
                    <Image source={{ uri: data.userInfo.avatar }} style={{ borderRadius: 30 }} height={60} width={60} />
                    <View marginL-15>
                        <Text marginB-2 fs19 font-bold
                            textBlack>{`${data.userInfo.first_name} ${data.userInfo.last_name}`}</Text>
                        <Text marginT-2 fs14 font-medium
                            black50>{data.email}</Text>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View paddingT-15 paddingB-20 paddingH-20 width={'100%'}>
                        <Controller
                            control={control}
                            render={({
                                field: {
                                    onChange,
                                    onBlur,
                                    value
                                }
                            }) => (
                                <StyledInput
                                    error={errors.firstName && errors.firstName.message}
                                    title={'Tên: '}
                                    placeholder={'First name'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="firstName"
                            rules={{
                                required: 'First name is required!',
                                maxLength: {
                                    value: 30,
                                    message: 'First name too long!'
                                },
                            }}
                        />
                        <Controller
                            control={control}
                            render={({
                                field: {
                                    onChange,
                                    onBlur,
                                    value
                                }
                            }) => (
                                <StyledInput
                                    error={errors.lastName && errors.lastName.message}
                                    title={'Họ đệm: '}
                                    placeholder={'Last name'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="lastName"
                            rules={{
                                required: 'Last name is required!',
                                maxLength: {
                                    value: 30,
                                    message: 'Last name too long!'
                                },
                            }}
                        />
                        <Controller
                            control={control}
                            render={({
                                field: {
                                    onChange,
                                    onBlur,
                                    value
                                }
                            }) => (
                                <StyledInput
                                    error={errors.username && errors.username.message}
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
                                    value: 30,
                                    message: 'Email too long!'
                                },
                            }}
                        />
                        <Controller
                            control={control}
                            render={({
                                field: {
                                    onChange,
                                    onBlur,
                                    value
                                }
                            }) => (
                                <StyledInput
                                    error={errors.phoneNumber && errors.phoneNumber.message}
                                    title={'Số điện thoại: '}
                                    placeholder={'Phone'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="phoneNumber"
                            rules={{ required: 'Phone number is required!' }}
                        />
                        <Controller
                            control={control}
                            render={({
                                field: {
                                    onChange,
                                    onBlur,
                                    value
                                }
                            }) => (
                                <StyledInput
                                    error={errors.address && errors.address.message}
                                    title={'Địa chỉ: '}
                                    placeholder={'Address'}
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
                                field: {
                                    onChange,
                                    onBlur,
                                    value
                                }
                            }) => (
                                <StyledDatePicker
                                    error={errors.dob && errors.dob.message}
                                    title={'Ngày sinh: '}
                                    placeholder={'Age'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="dob"
                            rules={{ required: 'Age is required!' }}
                        />
                    </View>
                    <View paddingH-20 paddingV-10>
                        <StyledButton onPress={handleSubmit(onSubmit)} label={'Cập nhật thông tin'} />
                    </View>
                </ScrollView>
            </View>
        </>
    )
}
