import React, { useState, useEffect } from 'react';
import { Text, TextField, TouchableOpacity, View } from 'react-native-ui-lib';
import { ScrollView, StyleSheet } from 'react-native';
import { Colors } from 'assets/Colors';
import { ScreenLayout, StyledButton } from 'screens/components';
import { LoadingScreen } from 'components';
import { companyApi } from 'apis';
import { Image } from 'react-native';
import { useMutation } from 'react-query';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';


export const ApproveJob = ({
    route,
    navigation
}) => {
    const [color, setColor] = useState('rgba(41, 114, 254, 1)');
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');
    const { userData, jobId } = route.params;

    const handleChange = (value) => {
        setMessage(value)
    }

    const {
        isLoading,
        data: responseData,
        error,
        mutate: approveJobHandler
    } = useMutation(companyApi.approveJob)

    const onApproveJob = () => {
        const data = {
            status: status,
            message: message,
            jobId: jobId,
            userId: userData.id
        };

        approveJobHandler(data);
    }

    useEffect(() => {
        if (responseData === undefined) return;
        setTimeout(() => navigation.navigate('CompanyHomeScreen'), 500);
    }, [responseData])

    return (
        <>
            {isLoading && <LoadingScreen />}
            <ScreenLayout
                title='Duyệt đơn ứng tuyển'
                icon='arrow-left'
                contentHeight={'100%'}
            >
                <View backgroundColor={'#FFFFFF'} height={'90%'}>
                    <ScrollView>
                        <View style={styles.container}>
                            <View paddingB-10 row spread center>
                                <View>
                                    <Image
                                        style={{
                                            width: 60,
                                            height: 60,
                                            backgroundColor: 'transparent',
                                            marginRight: 20,
                                            borderRadius: 30
                                        }}
                                        source={{
                                            uri: `${userData.avatar}`
                                        }} />
                                </View>
                                <View width={'70%'}>
                                    <Text style={{ width: '100%' }} textBlack fs18 font-extraBold>{userData.last_name + ' ' + userData.first_name}</Text>
                                </View>
                            </View >
                            <View paddingH-10 paddingT-10>
                                <StyledButton onPress={() => navigation.navigate('ViewCV', { cv: {}, id: userData.cvId })} label={'Xem CV'} />
                            </View>
                            <View paddingH-5 marginH-10 marginT-15 style={
                                {
                                    backgroundColor: '#fff',
                                    borderRadius: 32,
                                    borderStyle: 'solid',
                                    borderColor: color,
                                    borderWidth: 2,
                                }
                            }
                            >
                                <Picker
                                    placeholder='Đặt trạng thái ứng tuyển'
                                    selectedValue={status}
                                    style={{ height: 50, width: '100%', color: color}}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setStatus(itemValue);
                                        if (itemValue == 'Từ chối')
                                        {
                                            setColor('#DF3131');
                                            setMessage(`Xin chào, ${userData.first_name}!\n\n\nSau khi tìm hiểu kỹ về CV mà bạn ứng tuyển, chúng tôi rất tiếc vì hồ sơ của bạn không đáp ứng được những điều kiện mà công ty đề ra. Chúc bạn may mắn khi ứng tuyển những công việc khác.\n\n\nTrân trọng!
                                            `);
                                        }
                                        if (itemValue == 'Hẹn lịch phỏng vấn') 
                                        
                                        {
                                            setColor('#486EB6');
                                            setMessage(`Xin chào, ${userData.first_name}!\n\n\nChúc mừng bạn!\nSau khi tìm hiểu kỹ về CV mà bạn ứng tuyển, bạn đã đáp ứng những tiêu chí mà công việc yêu cầu. Tuy nhiên, chúng tôi cần kiểm tra thêm về những kiến thức của bạn. Vì vậy chúng tôi sẽ sắp xếp lịch để phỏng vấn bạn trong vòng 14 ngày từ khi bạn nhận được thông báo này.\n\n\nTrân trọng!
                                            `);
                                        }
                                        if (itemValue == 'Chấp nhận') 
                                        {
                                            setColor('#3FB26C');
                                            setMessage(`Xin chào, ${userData.first_name}!\n\n\nChúc mừng bạn!\nSau khi tìm hiểu kỹ về CV mà bạn ứng tuyển cho công việc này, chúng tôi xin được chúc mừng bạn vì đã đáp ứng đủ các điều kiện mà công ty đưa ra và trở thành một phần của công ty! Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất!\n\n\nTrân trọng!
                                            `);
                                        }
                                    }}
                                    mode='dropdown'
                                >
                                    <Picker.Item label='Đặt trạng thái ứng tuyển' enabled={false} />
                                    <Picker.Item value={'Từ chối'} label={'Từ chối'} />
                                    <Picker.Item value={'Chấp nhận'} label={'Chấp nhận'} />
                                    <Picker.Item value={'Hẹn lịch phỏng vấn'} label={'Hẹn lịch phỏng vấn'} />
                                </Picker>
                            </View>
                            <View paddingH-10 paddingT-10 marginT-15 style={styles.container}>
                                <View marginB-15>
                                    <Text fs14>Ghi chú cho ứng viên</Text>
                                </View>
                                <View>
                                    <TextField
                                        placeholder='Ghi chú'
                                        placeholderTextColor={'rgba(0,0,0,0.6)'}
                                        value={message}
                                        onChangeText={handleChange}
                                        style={styles.styledInput}
                                        multiline={true}
                                        numberOfLines={5}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View marginB-15 paddingH-40 backgroundColor={'#FFFFFF'}>
                        <StyledButton onPress={onApproveJob} label={'Xác nhận'} />
                    </View>
                </View>
            </ScreenLayout>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: '#fff',
    },
    iconStyle: {
        position: 'absolute',
        top: -24,
        right: 10
    },
    styledInput: {
        borderStyle: 'solid',
        borderColor: '#d9d9d9',
        borderWidth: 1,
        paddingTop: 10,
        paddingLeft: 10,
        backgroundColor: '#fff',
        zIndex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
    }
})