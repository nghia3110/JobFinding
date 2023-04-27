import { Text, View } from 'react-native-ui-lib';
import React, { useEffect, useRef, useState } from 'react';
import { StyledButton, StyledInput, ScreenLayout } from 'screens/components';
import { ScrollView, TouchableOpacity } from 'react-native';
import { LoadingScreen } from 'components';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/auth';
import { User } from 'assets';
import { userApi } from 'apis';
import { useMutation } from 'react-query';
import { useAuth } from 'hooks';

export const Skill = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { type, id } = route.params;
    const { user } = useAuth();
    const skill = user.userInfo.skill;
    const lastItem = skill ? skill[skill.length - 1] : '';
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
            title: skill[id-1].title,
            description: skill[id-1].description,
        }
    }) : useForm();

    const onSubmit = values => {
        if (type !== "Update") {
            let id = 1;
            if (lastItem !== undefined) id = lastItem.id + 1;
            const skillInfo = {
                skill: {
                    id: id,
                    title: values.title,
                    description: values.description
                }  
            }
            updateHandler(skillInfo);
        } else {
            const skillInfo = {
                skill: {
                    id: id,
                    title: values.title,
                    description: values.description
                }
            }
            updateHandler(skillInfo);
        }
    };

    useEffect(() => {
        if (data === undefined) return;
        dispatch(setUser({
            ...user,
            userInfo: {
                ...user.userInfo,
                skill: data.skill
            }
        }))
        setTimeout(() => navigation.navigate('ViewProfile'), 500);
    }, [data]);

    return (
        <>
            {isLoading && <LoadingScreen />}
            <ScreenLayout contentHeight={'100%'} icon={'arrow-left'} title={'Kĩ năng'}>
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
                                    title={'Kĩ năng: '}
                                    placeholder={'VD: Kỹ năng tiếng Anh'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="title"
                            rules={{
                                required: 'Title is required!',
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
                                    title={'Mô tả: '}
                                    placeholder={'Mô tả chi tiết kỹ năng'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="description"
                            rules={{
                                required: 'Description is required!',
                            }}
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
