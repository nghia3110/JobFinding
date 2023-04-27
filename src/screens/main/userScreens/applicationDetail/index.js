import React, { useState } from 'react';
import { Text, View } from 'react-native-ui-lib';
import { ScrollView, StyleSheet } from 'react-native';
import { Colors } from 'assets/Colors';
import { ScreenLayout, StyledButton } from 'screens/components';
import { Image } from 'react-native';


export const ApplicationDetail = ({
    route
}) => {
    const { detail } = route.params;

    return (
        <ScreenLayout
            title='Thông tin ứng tuyển'
            icon='arrow-left'
            contentHeight={'100%'}
        >
            <View backgroundColor={'#FFFFFF'} height={'90%'}>
                <ScrollView>
                    <View style={styles.container}>
                        <View paddingB-20 row spread center marginB-20>
                            <View>
                                <Image
                                    style={{
                                        width: 70,
                                        height: 70,
                                        backgroundColor: 'transparent',
                                        marginRight: 20
                                    }}
                                    source={{
                                        uri: `${detail.companyLogo}`
                                    }} />
                            </View>
                            <View width={'70%'}>
                                <Text style={{ width: '100%' }} textBlack fs18 font-extraBold>{detail.job_name}</Text>
                                <Text black50 fs14 font-bold>{detail.companyName}</Text>
                            </View>
                        </View>
                        {detail.status === 'Chờ kết quả' && <View
                            style={{
                                borderRadius: 15,
                                backgroundColor: '#fff4ec',
                            }}
                            paddingB-10 row spread center marginB-20 width={'95%'} marginH-10
                        >
                            <Text fs14
                                style={{
                                    color: '#c1631b',
                                    marginTop: 10
                                }}
                            >
                                {detail.status}
                            </Text>
                        </View>}
                        {detail.status === 'Từ chối' && <View
                            style={{
                                borderRadius: 15,
                                backgroundColor: '#feefef',
                            }}
                            paddingB-10 row spread center marginB-20 width={'95%'} marginH-10
                        >
                            <Text fs14
                                style={{
                                    color: '#df3131',
                                    marginTop: 10
                                }}
                            >
                                {detail.status}
                            </Text>
                        </View>}
                        {detail.status === 'Hẹn lịch phỏng vấn' && <View
                            style={{
                                borderRadius: 15,
                                backgroundColor: '#eef2fa',
                            }}
                            paddingB-10 row spread center marginB-20 width={'95%'} marginH-10
                        >
                            <Text fs14
                                style={{
                                    color: '#355fae',
                                    marginTop: 10
                                }}
                            >
                                {detail.status}
                            </Text>
                        </View>}
                        {detail.status === 'Chấp nhận' && <View
                            style={{
                                borderRadius: 15,
                                backgroundColor: '#edf9f0',
                            }}
                            paddingB-10 row spread center marginB-20 width={'95%'} marginH-10
                        >
                            <Text fs14
                                style={{
                                    color: '#29a95c',
                                    marginTop: 10
                                }}
                            >
                                {detail.status}
                            </Text>
                        </View>}
                        <View paddingB-20 marginB-20 paddingH-15>
                            <Text fs14>{detail.message}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </ScreenLayout>
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

    itemInfoContainer: {
        alignItems: 'center',
        paddingTop: 20,
        marginBottom: 10
    },
    iconStyle: {
        width: '15%'
    },
    statusContainer: {
        borderRadius: 15,
    }
})