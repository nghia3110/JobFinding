import React, { useEffect, useState } from 'react';
import { Image, Text, View, RadioGroup, RadioButton, Incubator } from 'react-native-ui-lib';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { companyApi } from 'apis';
import { LoadingScreen } from 'components';
import { StyledButton, StyledInput, ScreenLayout, StyledTextArea, StyledPicker } from 'screens/components';
import { ScrollView, StyleSheet } from 'react-native';
import { useAuth } from 'hooks';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { boxWithShadow } from 'utilities/boxShadow';

const { TextField } = Incubator;

const location = [
    {
        label: 'Hà Nội',
        value: 'Hà Nội'
    },
    {
        label: 'TP.Hồ Chí Minh',
        value: 'TP.Hồ Chí Minh'
    },
    {
        label: 'Đà Nẵng, Thừa Thiên Huế',
        value: 'Đà Nẵng, Thừa Thiên Huế'
    }
];

const jobType = [
    {
        label: 'Toàn thời gian',
        value: 'Toàn thời gian'
    },
    {
        label: 'Thực tập',
        value: 'Thực tập'
    },
];

const position = [
    {
        label: 'Nhân viên',
        value: 'Nhân viên'
    },
    {
        label: 'Thực tập sinh',
        value: 'Thực tập sinh'
    },
    {
        label: 'Trưởng nhóm',
        value: 'Trưởng nhóm'
    },
    {
        label: 'Quản lý',
        value: 'Quản lý'
    },
];

const category = [
    {
        label: 'IT phần mềm',
        value: '1'
    },
    {
        label: 'Dịch vụ khách hàng',
        value: '2'
    },
    {
        label: 'IT phần cứng / mạng',
        value: '3'
    },
    {
        label: 'Điện tử viễn thông',
        value: '4'
    },
    {
        label: 'Hành chính / Văn phòng',
        value: '5'
    },
];

export const UpdateJob = ({ route, navigation }) => {
    const { jobData } = route.params;
    const [updatedJobData, setUpdatedJobData] = useState({});
    const { company } = useAuth();
    const [salaryType, setSalaryType] = useState((jobData.salaryFrom || jobData.salaryTo) ? 'Khoảng lương' : 'Thỏa thuận');

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
            category: category[jobData.categoryId - 1].value,
            location: jobData.location,
            salaryFrom: jobData.salaryFrom !== null ? jobData.salaryFrom.toString() : 0,
            salaryTo: jobData.salaryTo !== null ? jobData.salaryTo.toString() : 0,
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
            category: values.category,
            location: values.location,
            salaryFrom: values.salaryFrom !== undefined ? parseInt(values.salaryFrom) : 0,
            salaryTo: values.salaryTo !== undefined ? parseInt(values.salaryTo) : 0,
            jobType: values.jobType,
            numberNeeded: parseInt(values.numberNeeded),
            position: values.position,
            job_description: values.job_description,
            job_requirement: values.job_requirement,
            job_benefit: values.job_benefit,
            id: jobData.id
        }
        /setUpdatedJobData(jobInfo);
        updateInfoHandler(jobInfo);
    }

    useEffect(() => {
        if (responseData === undefined) return;
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
                                <StyledPicker
                                    error={errors.category && errors.category.message}
                                    title={'Ngành nghề: '}
                                    placeholder={'Ngành nghề'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    data={category}
                                />
                            )}
                            name="category"
                            rules={{
                                required: 'Category is required!',
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
                                <StyledPicker
                                    error={errors.location && errors.location.message}
                                    title={'Địa điểm: '}
                                    placeholder={'Địa điểm'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    data={location}
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
                        <View style={{ position: 'relative' }}>
                            <Text fs14 marginB-10 marginL-10>Mức lương:</Text>
                            <View marginT-10 marginB-20>
                                <RadioGroup
                                    initialValue={salaryType}
                                    onValueChange={value => setSalaryType(value)}
                                    style={{ display: 'flex', flexDirection: 'row', gap: 20, marginLeft: 10 }}
                                >
                                    <RadioButton value={'Thỏa thuận'} label={'Thỏa thuận'} />
                                    <RadioButton value={'Khoảng lương'} label={'Khoảng lương'} />
                                </RadioGroup>
                            </View>
                            {salaryType === 'Khoảng lương' && <>
                                <View marginT-20 flex row spread centerV>
                                    <Controller
                                        control={control}
                                        render={({
                                            field: {
                                                onChange,
                                                value
                                            }
                                        }) => (
                                            <TextField
                                                placeholder={'Từ'}
                                                placeholderTextColor={'rgba(0,0,0,0.5)'}
                                                style={style.styledInput}
                                                value={value}
                                                onChangeText={onChange}
                                                editable={salaryType === 'Khoảng lương'}
                                            />
                                        )}
                                        name="salaryFrom"
                                    />
                                    <Icon name={'arrow-right'} size={20} />
                                    <Controller
                                        control={control}
                                        render={({
                                            field: {
                                                onChange,
                                                value
                                            }
                                        }) => (
                                            <TextField
                                                placeholder={'Đến'}
                                                placeholderTextColor={'rgba(0,0,0,0.5)'}
                                                style={style.styledInput}
                                                value={value}
                                                onChangeText={onChange}
                                                editable={salaryType === 'Khoảng lương'}
                                            />
                                        )}
                                        name="salaryTo"
                                    />
                                </View>
                                <View marginT-15 marginB-10><Text fs14 center centerV>triệu / tháng</Text></View>
                            </>}
                        </View>
                        <Controller
                            control={control}
                            render={({
                                field: {
                                    onChange,
                                    onBlur,
                                    value
                                }
                            }) => (
                                <StyledPicker
                                    error={errors.jobType && errors.jobType.message}
                                    title={'Hình thức: '}
                                    placeholder={'Hình thức làm việc'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    data={jobType}
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
                                <StyledPicker
                                    error={errors.position && errors.position.message}
                                    title={'Vị trí công việc: '}
                                    placeholder={'Vị trí'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    data={position}
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
                                <StyledTextArea
                                    error={errors.job_description && errors.job_description.message}
                                    title={'Mô tả công việc: '}
                                    placeholder={'Mô tả công việc'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
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
                                <StyledTextArea
                                    error={errors.job_requirement && errors.job_requirement.message}
                                    title={'Yêu cầu ứng viên: '}
                                    placeholder={'Yêu cầu ứng viên'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
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
                                <StyledTextArea
                                    error={errors.job_benefit && errors.job_benefit.message}
                                    title={'Quyền lợi: '}
                                    placeholder={'Quyền lợi'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
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

const style = StyleSheet.create({
    styledInput: {
        borderStyle: 'solid',
        borderWidth: 0,
        borderRadius: 12,
        paddingLeft: 15,
        backgroundColor: '#fff',
        ...boxWithShadow,
        elevation: 12,
        paddingTop: 6,
        paddingBottom: 6,
        zIndex: 1,
        width: 150
        //textAlignVertical: 'top'
    },
});