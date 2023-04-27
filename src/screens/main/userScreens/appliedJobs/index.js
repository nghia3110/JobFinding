import React from 'react';
import { ScreenLayout } from 'screens/components';
import AppliedJobCard from 'screens/components/card/AppliedJobCard';
import { ScrollView } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { useQuery } from 'react-query';
import { userApi } from 'apis';
import { LoadingScreen } from 'components';

export const AppliedJobs = () => {
    const {
        data,
        isLoading
    } = useQuery('get-applied-jobs', userApi.getJobApplied)

    return (
        <>
            {isLoading && <LoadingScreen />}
            <ScreenLayout title={'Công việc đã ứng tuyển'} icon={'arrow-left'} notFooter
                contentHeight={'100%'}>
                <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#fff'}}>
                    <View width={'100%'} paddingB-40 paddingH-20>
                        <View paddingV-25>
                            {data && data.map((el, i) => <AppliedJobCard key={i} detail={el}/>)}
                        </View>
                    </View>
                </ScrollView>
            </ScreenLayout>
        </>
    )
}
