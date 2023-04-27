import { Text, View } from 'react-native-ui-lib';
import React from 'react'
import { ScreenLayout } from 'screens/components';
import { ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import { jobApi } from 'apis';
import { LoadingScreen } from 'components';
import JobCard from 'screens/components/card/JobCard';
import { NotFound } from 'assets';

const convertUrl = (key, data) => {
    let query = '';
    
    key.forEach(el => {
        if (data[el]) 
        {
            query += `${el}=${data[el]}&`;
        }
    })
    return query.slice(0, -1);
}

export const SearchResult = ({ route }) => {
    const queryParams = route.params;
    const queryKey = Object.keys(queryParams);

    const {
        data,
        isLoading
    } = useQuery(['search-job', queryParams], () => jobApi.searchJob(convertUrl(queryKey, queryParams)))
    //console.log(data);

    return (
        <ScreenLayout title={'Kết quả tìm kiếm'} icon={'arrow-left'} contentHeight={'100%'}>
            <ScrollView style={{ backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
                <View width={'100%'} paddingB-40 paddingH-20>
                    {isLoading && <LoadingScreen/>}
                    {data && (
                        data.length
                            ? <View paddingV-25>
                                {data.map((detail,i) => <JobCard key={i} detail={detail}/>)}
                            </View>
                            : <>
                                <NotFound/>
                                <Text fs18 font-bold center style={{ marginTop: -100 }}>Không có kết quả phù hợp!</Text>
                            </>
                    )}
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}
