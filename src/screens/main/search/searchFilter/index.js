import React from 'react'
import { ScreenLayout, StyledButton } from 'screens/components';
import { Text, View } from 'react-native-ui-lib';
import { ScrollView } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { SearchInput, FilterInput } from 'screens/main/search/component';

const position = [
    {
        label: 'Thực tập sinh',
        value: 'Thực tập sinh'
    },
    {
        label: 'Nhân viên',
        value: 'Nhân viên'
    },
    {
        label: 'Trưởng nhóm',
        value: 'Trưởng nhóm'
    },
    {
        value: 'Phó giám đốc',
        label: 'Phó giám đốc'
    },
    {
        value: 'Giám đốc',
        label: 'Giám đốc'
    }
];
const jobType = [
    {
        value: 'Toàn thời gian',
        label: 'Toàn thời gian'
    },
    {
        value: 'Thực tập',
        label: 'Thực tập'
    },
];

const location = [
    {
        value: 'Hà Nội',
        label: 'Hà Nội'
    },
    {
        value: 'TP.Hồ Chí Minh',
        label: 'TP.Hồ Chí Minh'
    },
    {
        value: 'Đà Nẵng, Thừa Thiên Huế',
        label: 'Đà Nẵng, Thừa Thiên Huế'
    },
];

const salary = [
    {
        value: '5 - 10 triệu',
        label: '5 - 10 triệu'
    },
    {
        value: '12 - 17 triệu',
        label: '12 - 17 triệu'
    },
    {
        value: 'Thoả thuận',
        label: 'Thoả thuận'
    },
    {
        value: 'Tới 40 triệu',
        label: 'Tới 40 triệu'
    },
];

export const SearchFilter = () => {
    const navi = useNavigation()
    const {
        handleSubmit,
        control,
    } = useForm();

    const onSubmit = values => {
        // console.log(values)
        // console.log({
        //     title: values.title,
        //     salary_type: values.salaryType.value,
        //     salary_from: values.salaryFrom.value,
        //     exp_years_from: values.yearExp.value,
        //     position_id: values.position.value,
        //     salary_to: values.salaryTo.value,
        // });
        navi.navigate('SearchResult', {
            job_name: values.job_name ,
            salary: values.salary,
            position: values.position,
            location: values.location,
        })
    };

    return (
        <ScreenLayout title={'Tìm kiếm'} icon={'arrow-left'} contentHeight={'100%'}>
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View width={'100%'} paddingT-15 paddingB-80 paddingH-10>
                    <Controller
                        control={control}
                        render={({
                            field: {
                                onChange,
                                value
                            }
                        }) => (
                            <SearchInput
                                placeholder={'Tên công việc'}
                                onChange={onChange}
                                value={value}
                            />
                        )}
                        name="job_name"
                    />
                    <View marginT-20 paddingT-20 marginL-10>
                        <Text textBlack fs18 font-medium>
                            Tìm kiếm theo
                        </Text>
                    </View>
                    <View padding-10>
                        <Controller
                            control={control}
                            render={({
                                field: {
                                    onChange,
                                    value
                                }
                            }) => (
                                <FilterInput
                                    placeholder={'Vị trí'}
                                    onChange={onChange}
                                    value={value}
                                    data={position}
                                />
                            )}
                            name="position"
                        />
                        <Controller
                            control={control}
                            render={({
                                field: {
                                    onChange,
                                    value
                                }
                            }) => (
                                <FilterInput
                                    placeholder={'Mức lương'}
                                    onChange={onChange}
                                    value={value}
                                    data={salary}
                                />
                            )}
                            name="salary"
                        />
                        <Controller
                            control={control}
                            render={({
                                field: {
                                    onChange,
                                    value
                                }
                            }) => (
                                <FilterInput
                                    placeholder={'Địa điểm làm việc'}
                                    onChange={onChange}
                                    value={value}
                                    data={location}
                                />
                            )}
                            name="location"
                        />
                    </View>
                    <StyledButton onPress={handleSubmit(onSubmit)} label={'Xác nhận'} />
                </View>
            </ScrollView>

        </ScreenLayout>
    )
}
