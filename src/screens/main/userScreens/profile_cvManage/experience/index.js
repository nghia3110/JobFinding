import { Text, View } from 'react-native-ui-lib';
import React, { useEffect, useRef, useState } from 'react';
import { StyledButton, StyledInput, ScreenLayout } from 'screens/components';
import { ScrollView, TouchableOpacity } from 'react-native';
import { LoadingScreen } from 'components';
import { useForm, Controller } from 'react-hook-form';
import { User } from 'assets';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/auth';
import { userApi } from 'apis';
import { useMutation } from 'react-query';
import { useAuth } from 'hooks';

export const Experience = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { type, id } = route.params;
    const { user } = useAuth();
    const experience = user.userInfo.experience;
    const lastItem = experience[experience.length - 1];
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
            company: experience[id-1].company,
            position: experience[id-1].position,
            start: experience[id-1].start,
            end: experience[id-1].end
        }
    }) : useForm();

    const onSubmit = values => {
        if (type !== "Update") {
            let id = 1;
            if (lastItem !== undefined) id = lastItem.id + 1;
            const experienceInfo = {
                experience: {
                    id: id,
                    company: values.company,
                    position: values.position,
                    start: values.start,
                    end: values.end
                }
            }
            updateHandler(experienceInfo);
        } else {
            const experienceInfo = {
                experience: {
                    id: id,
                    company: values.company,
                    position: values.position,
                    start: values.start,
                    end: values.end
                }
            }
            updateHandler(experienceInfo);
        }
    };

    useEffect(() => {
        if (data === undefined) return;
        dispatch(setUser({
            ...user,
            userInfo: {
                ...user.userInfo,
                experience: data.experience
            }
        }))
        setTimeout(() => navigation.navigate('ViewProfile'), 500);
    }, [data]);

    return (
        <>
            {isLoading && <LoadingScreen />}
            <ScreenLayout contentHeight={'100%'} icon={'arrow-left'} title={'Kinh nghiệm'}>
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
                                    title={'Tên công ty: '}
                                    placeholder={'Tên công ty'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="company"
                            rules={{
                                required: 'Company is required!',
                            }}
                        />

                        <Controller
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <StyledInput
                                    error={
                                        errors.position &&
                                        errors.position.message
                                    }
                                    title={'Vị trí: '}
                                    placeholder={'Vị trí'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="position"
                            rules={{
                                required: 'Position is required!',
                            }}
                        />

                        <Controller
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <StyledInput
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
                                <StyledInput
                                    error={
                                        errors.start && errors.start.message
                                    }
                                    title={'Kết thúc: '}
                                    placeholder={'Kết thúc'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="end"
                            rules={{ required: 'End is required!' }}
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
