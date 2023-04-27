import React from 'react'
import { ScreenLayout, CvCard } from 'screens/components';
import { View } from 'react-native-ui-lib';
import { useQuery } from 'react-query';
import { cvApi } from 'apis';
import { LoadingScreen } from 'components';

export const ListCV = ({ navigation }) => {
    const {
        data: resData,
        isLoading
    } = useQuery('list-all-cv', cvApi.listAllCv);

    return (
        <ScreenLayout contentHeight={'100%'} title={'CV của bạn'} icon={'arrow-left'}
                      notFooter>
            <View paddingH-10>
                {isLoading ? <LoadingScreen/> : resData.map((item, i) => <CvCard key={i} title={item.title}
                                                                                onPress={() => navigation.navigate('ViewCV', { cv: {}, id: item.id })}/>)}
            </View>
        </ScreenLayout>
    )
}
