import { Text, View } from 'react-native-ui-lib';
import React, { useEffect, useRef, useState } from 'react';
import { StyledButton, StyledInput, ScreenLayout, StyledDatePicker } from 'screens/components';
import { ScrollView, TouchableOpacity } from 'react-native';
import { LoadingScreen } from 'components';
import { useForm, Controller } from 'react-hook-form';
import { User } from 'assets';
import { userApi } from 'apis';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/auth';
import { useMutation } from 'react-query';
import { useAuth } from 'hooks';

export const Education = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { type, id } = route.params;
    const { user } = useAuth();
    const education = user.userInfo.education;
    const lastItem = education ? education[education.length - 1] : '';
    const {
        isLoading,
        mutate: updateHandler,
        data,
    } = useMutation(userApi.updateProfile);

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        watch,
    } = type === 'Update' ? useForm({
        defaultValues: {
            id: id,
            school: education[id-1].school,
            major: education[id-1].major,
            start: education[id-1].start,
            end: education[id-1].end
        }
    }) : useForm();

    const onSubmit = values => {
        if (type !== "Update") {
            let id = 1;
            if (lastItem !== '') id = lastItem.id + 1;
            const educationInfo = {
                education: {
                    id: id,
                    school: values.school,
                    major: values.major,
                    start: values.start,
                    end: values.end
                }
            }
            updateHandler(educationInfo);
        } else {
            const educationInfo = {
                education: {
                    id: id,
                    school: values.school,
                    major: values.major,
                    start: values.start,
                    end: values.end
                }
            }
            updateHandler(educationInfo);
        }
    };

    useEffect(() => {
        if (data === undefined) return;
        dispatch(setUser({
            ...user,
            userInfo: {
                ...user.userInfo,
                education: data.education
            }
        }))
        setTimeout(() => navigation.navigate('ViewProfile'), 500);
    }, [data]);

    return (
        <>
            {isLoading && <LoadingScreen />}
            <ScreenLayout contentHeight={'100%'} icon={'arrow-left'} title={'Học vấn'}>
                <ScrollView backgroundColor={'#fff'}>
                    <View paddingT-15 paddingB-20 paddingH-20 width={'100%'}>
                        <Controller
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <StyledInput
                                    error={
                                        errors.school &&
                                        errors.school.message
                                    }
                                    title={'Tên trường: '}
                                    placeholder={'Tên trường'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="school"
                            rules={{
                                required: 'School is required!',
                            }}
                        />

                        <Controller
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <StyledInput
                                    error={
                                        errors.major &&
                                        errors.major.message
                                    }
                                    title={'Chuyên ngành: '}
                                    placeholder={'VD: Khoa học máy tính'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="major"
                            rules={{
                                required: 'Major is required!',
                            }}
                        />

                        <Controller
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <StyledDatePicker
                                    error={
                                        errors.start && errors.start.message
                                    }
                                    title={'Bắt đầu: '}
                                    placeholder={'Bắt đầu'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="start"
                            rules={{ required: 'Start is required!' }}
                        />

                        <Controller
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <StyledDatePicker
                                    error={
                                        errors.end && errors.end.message
                                    }
                                    title={'Kết thúc: '}
                                    placeholder={'Kết thúc'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="end"
                        />
                    </View>
                </ScrollView>
                <View paddingH-30 paddingV-10 backgroundColor={'#fff'} row spread>
                    <StyledButton
                        onPress={handleSubmit(onSubmit)}
                        label={type !== "Update" ? 'Thêm mới' : "Cập nhật"}
                        width={'100%'} />
                </View>
            </ScreenLayout>
        </>
    )
}
