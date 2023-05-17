import { ScreenLayout } from 'screens/components';
import { ScrollView, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { View, Text, Image} from 'react-native-ui-lib';
import React from 'react';
import { useQuery } from 'react-query';
import { LoadingScreen } from 'components';
import { companyApi } from 'apis';
import { useNavigation } from '@react-navigation/native';

export const Notifications = () => {
    const navi = useNavigation();
    const {
        data,
        isLoading
    } = useQuery('get-notification', companyApi.getNotification);

    return (
        <>
            {isLoading && <LoadingScreen />}
            <ScreenLayout title='Thông báo' icon='arrow-left' contentHeight={'100%'}>
                <ScrollView height={'100%'} showsVerticalScrollIndicator={false}>
                    <View width={'100%'} paddingB-40 paddingH-20>
                        <View paddingV-25>
                            {data && data.map((el, i) =>
                                <TouchableWithoutFeedback key={i} onPress={() => navi.navigate('ApproveJob',
                                    {
                                        userData: {
                                            id: el.userId,
                                            first_name: el.first_name,
                                            last_name: el.last_name,
                                            avatar: el.avatar,
                                            cvId: el.cvId
                                        },
                                        jobId: el.jobId
                                    })}>
                                    <View style={cardStyle.container}>
                                        <Image
                                            style={cardStyle.logo}
                                            source={{
                                                uri: `${el.avatar}`
                                            }} />
                                        <Text paddingT-10 textBlack fs14 font-bold>{`${el.first_name + ' ' + el.last_name} đã ứng tuyển công việc ${el.job_name}`}</Text>
                                    </View>
                                </TouchableWithoutFeedback>)}
                        </View>
                    </View>
                </ScrollView>
            </ScreenLayout>
        </>
    )
}

const cardStyle = StyleSheet.create({
    container: {
        position: 'relative',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 80,
        paddingRight: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        //...boxWithShadow,
        //elevation: 12,
        zIndex: 1,
        marginBottom: 20,
    },
    logo: {
        position: 'absolute',
        left: 25,
        top: 25,
        zIndex: 2,
        transform: [{
            scale: 1.7
        }],
        width: 30,
        height: 30,
        backgroundColor: 'transparent',
        marginRight: 20,
        borderRadius: 15
    },
    
})
