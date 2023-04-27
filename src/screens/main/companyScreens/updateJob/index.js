import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import { Images, User } from 'assets';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { companyApi } from 'apis';
import { LoadingScreen } from 'components';
import { StyledButton, StyledInput, ScreenLayout } from 'screens/components';
import { ScrollView } from 'react-native';
import { useAuth } from 'hooks';

export const UpdateJob = ({ route, navigation }) => {
    const { jobData } = route.params;
    const [updatedJobData, setUpdatedJobData] = useState({});
    const { company } = useAuth();

    const {
        isLoading,
        mutate: updateInfoHandler,
        data: responseData,
    } = useMutation(companyApi.updateJob)

    const handleString = (input) => {
        let arr = [];
        if (input.includes('\n')) arr = input.split('\n');
        else arr = input.split('&');
        let res = '';
        arr.map(item => {
            res += item + '\n';
        });
        return res;
    }

    const {
        handleSubmit,
        control,
        formState: {
            errors,
        },
    } = useForm({
        defaultValues: {
            job_name: jobData.job_name,
            location: jobData.location,
            salary: jobData.salary,
            jobType: jobData.jobType,
            numberNeeded: jobData.numberNeeded.toString(),
            position: jobData.position,
            job_description: handleString(jobData.job_description),
            job_requirement: handleString(jobData.job_requirement),
            job_benefit: handleString(jobData.job_benefit)
        }
    });

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
            job_benefit: values.job_benefit,
            id: jobData.id
        }
        setUpdatedJobData(jobInfo);
        updateInfoHandler(jobInfo);
    }

    useEffect(() => {
        if (responseData === undefined) return;
        //Toast.show('Update info successfully ')
        setTimeout(() => navigation.navigate('JobManager', { jobData: updatedJobData }), 500);
    }, [responseData])

    return (
        <>
            {isLoading && <LoadingScreen />}
            <ScreenLayout
                title='Chỉnh sửa công việc'
                icon='arrow-left'
                contentHeight={'100%'}
            >
                <ScrollView showsVerticalScrollIndicator={false} backgroundColor={'#ffffff'}>
                    <View paddingT-20 marginB-20 row centerV center>
                        <Image source={{ uri: `${company.companyInfo.companyLogo}` }} height={60} width={60} />
                        <View width={'70%'} marginL-15>
                            <Text style={{ width: '100%' }} textBlack fs18 font-extraBold>{jobData.job_name}</Text>
                        </View>
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
                                    title={'Mức lương: '}
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
                                    title={'Hình thức làm việc: '}
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
                                    title={'Vị trí: '}
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
                                    numberOfLines={10}
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
                                    numberOfLines={10}
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
                                    numberOfLines={10}
                                />
                            )}
                            name="job_benefit"
                            rules={{ required: 'Job benefit is required!' }}
                        />
                    </View>
                    <View paddingH-30 paddingV-10 backgroundColor={'#fff'} row spread>
                        <StyledButton onPress={handleSubmit(onSubmit)} label={'Cập nhật thông tin'} />
                    </View>
                </ScrollView>
            </ScreenLayout>

        </>
    )
}
