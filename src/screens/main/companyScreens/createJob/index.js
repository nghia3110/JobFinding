import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import { Images, User } from 'assets';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { companyApi } from 'apis';
import { LoadingScreen } from 'components';
import Toast from 'react-native-simple-toast';
import { StyledButton, StyledInput, StyledDatePicker, ScreenLayout } from 'screens/components';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from 'hooks';
import { ScrollView } from 'react-native';

export const CreateJob = () => {
    const navi = useNavigation();
    const { company } = useAuth();

    const {
        isLoading,
        mutate: createJobHandler,
        data: responseData,
    } = useMutation(companyApi.createJob)

    const {
        handleSubmit,
        control,
        formState: {
            errors,
        },
    } = useForm();

    const onSubmit = (values) => {
        const jobInfo = {
            job_name: values.job_name,
            location: values.location,
            salary: values.salary,
            jobType: values.jobType,
            numberNeeded: parseInt(values.numberNeeded),
            position: values.position,
            job_description: values.job_description,
            job_requirement: values.job_requirement,
            job_benefit: values.job_benefit
        }
        createJobHandler(jobInfo)
    }

    useEffect(() => {
        if (responseData === undefined) return;
        //Toast.show('Create job successfully!')
        setTimeout(() => navi.navigate('CompanyHomeScreen'), 500);
    }, [responseData])

    return (
        <>
            {isLoading && <LoadingScreen />}
            <ScreenLayout
                title='Tạo công việc mới'
                icon='arrow-left'
                contentHeight={'100%'}
            >
                <ScrollView showsVerticalScrollIndicator={false} backgroundColor={'#ffffff'}>
                    <View paddingT-20 marginB-20 row center>
                        <Image source={{ uri: `${company.companyInfo.companyLogo}` }} height={80} width={80} />
                    </View>
                    <View paddingT-15 paddingB-10 paddingH-20 width={'100%'}>
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
                                    error={errors.job_name && errors.job_name.message}
                                    title={'Tên công việc: '}
                                    placeholder={'Tên công việc'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="job_name"
                            rules={{
                                required: 'Job name is required!',
                                maxLength: {
                                    value: 30,
                                    message: 'Job name too long!'
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
                                    error={errors.location && errors.location.message}
                                    title={'Địa điểm: '}
                                    placeholder={'Địa điểm'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="location"
                            rules={{
                                required: 'Location is required!',
                                maxLength: {
                                    value: 30,
                                    message: 'Location too long!'
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
                                    error={errors.salary && errors.salary.message}
                                    title={'Lương: '}
                                    placeholder={'Mức lương'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="salary"
                            rules={{
                                required: 'Salary is required!',
                                maxLength: {
                                    value: 30,
                                    message: 'Salary too long!'
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
                                    error={errors.jobType && errors.jobType.message}
                                    title={'Hình thức: '}
                                    placeholder={'Hình thức làm việc'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="jobType"
                            rules={{ required: 'Job type is required!' }}
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
                                    error={errors.numberNeeded && errors.numberNeeded.message}
                                    title={'Số lượng cần tuyển: '}
                                    placeholder={'Số lượng cần tuyển'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="numberNeeded"
                            rules={{ required: 'numberNeeded is required!' }}
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
                                    error={errors.position && errors.position.message}
                                    title={'Vị trí công việc: '}
                                    placeholder={'Vị trí'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="position"
                            rules={{ required: 'Position is required!' }}
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
                                    error={errors.jobDescription && errors.jobDescription.message}
                                    title={'Mô tả công việc: '}
                                    placeholder={'Mô tả công việc'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    multiline={true}
                                    numberOfLines={8}
                                />
                            )}
                            name="job_description"
                            rules={{ required: 'Job description is required!' }}
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
                                    error={errors.jobRequirement && errors.jobRequirement.message}
                                    title={'Yêu cầu ứng viên: '}
                                    placeholder={'Yêu cầu ứng viên'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    multiline={true}
                                    numberOfLines={8}
                                />
                            )}
                            name="job_requirement"
                            rules={{ required: 'Job requirement is required!' }}
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
                                    error={errors.jobBenefit && errors.jobBenefit.message}
                                    title={'Quyền lợi: '}
                                    placeholder={'Quyền lợi'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    multiline={true}
                                    numberOfLines={8}
                                />
                            )}
                            name="job_benefit"
                            rules={{ required: 'Job benefit is required!' }}
                        />
                    </View>
                    <View paddingH-30 paddingV-10 backgroundColor={'#fff'} row spread>
                        <StyledButton onPress={handleSubmit(onSubmit)} label={'Tạo công việc'} />
                    </View>
                </ScrollView>

            </ScreenLayout>
        </>
    )
}
