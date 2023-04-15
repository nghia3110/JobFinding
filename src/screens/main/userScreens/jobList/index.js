import { ScreenLayout } from 'screens/components';
import { ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';
import WideJobCard from 'screens/components/card/WideJobCard';
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
            <ScreenLayout title='Jobs' icon='arrow-left' contentHeight={'100%'}
                          notFooter>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View width={'100%'} paddingB-40 paddingH-20>
                        <View paddingV-25>
                            {data && data.map((el, i) => <WideJobCard key={i} detail={el}/>)}
                        </View>
                    </View>
                </ScrollView>
            </ScreenLayout>
        </>
    )
}
