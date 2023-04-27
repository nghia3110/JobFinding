import { ScreenLayout } from 'screens/components';
import { ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';
import JobCard from 'screens/components/card/JobCard';
import React from 'react';
import { useQuery } from 'react-query';
import { LoadingScreen } from 'components';
import { jobApi } from 'apis';

export const JobList = () => {
    const {
        data,
        isLoading
    } = useQuery('get-all-job', jobApi.getAllJob);

    return (
        <>
            {isLoading && <LoadingScreen/>}
            <ScreenLayout title='Công việc' icon='arrow-left' contentHeight={'100%'}
                          notFooter>
                <ScrollView showsVerticalScrollIndicator={false} backgroundColor={'#fff'}>
                    <View width={'100%'} paddingB-40 paddingH-20>
                        <View paddingV-25>
                            {data && data.map((el, i) => <JobCard key={i} detail={el}/>)}
                        </View>
                    </View>
                </ScrollView>
            </ScreenLayout>
        </>
    )
}
