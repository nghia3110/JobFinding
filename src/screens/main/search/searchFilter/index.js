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
        value: '5,10',
        label: '5 - 10 triệu'
    },
    {
        value: '10,15',
        label: '10 - 15 triệu'
    },
    {
        value: '15,20',
        label: '15 - 20 triệu'
    },
    {
        value: '20,30',
        label: '20 - 30 triệu'
    },
    {
        value: '30,0',
        label: 'Trên 30 triệu'
    },
    {
        value: '0,0',
        label: 'Thỏa thuận'
    }
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

const handleSalary = (salary) => {
    if(salary) {
        const arr = salary.split(',');
        const res = [];
        res.push(parseInt(arr[0]), parseInt(arr[1]));
        return res;
    } else {
        return undefined;
    }
}

export const SearchFilter = () => {
    const navi = useNavigation()
    const {
        handleSubmit,
        control,
    } = useForm();

    const onSubmit = values => {
        const salaryValues = handleSalary(values.salary)
        //console.log(salaryValues[0], salaryValues[1])
        navi.navigate('SearchResult', {
            job_name: values.job_name ,
            salaryFrom: salaryValues !== undefined ? salaryValues[0] : undefined,
            salaryTo: salaryValues !== undefined ? salaryValues[1] : undefined,
            position: values.position,
            location: values.location,
            category: values.category
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
                        <Controller
                            control={control}
                            render={({
                                field: {
                                    onChange,
                                    value
                                }
                            }) => (
                                <FilterInput
                                    placeholder={'Nghề nghiệp'}
                                    onChange={onChange}
                                    value={value}
                                    data={category}
                                />
                            )}
                            name="category"
                        />
                    </View>
                    <StyledButton onPress={handleSubmit(onSubmit)} label={'Xác nhận'} />
                </View>
            </ScrollView>

        </ScreenLayout>
    )
}
