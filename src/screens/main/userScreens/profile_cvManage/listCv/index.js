import React from 'react'
import { ScreenLayout, CvCard, StyledButton } from 'screens/components';
import { View, Text } from 'react-native-ui-lib';
import { useQuery } from 'react-query';
import { cvApi } from 'apis';
import { LoadingScreen } from 'components';
import { NotFound } from 'assets';

export const ListCV = ({ navigation }) => {
    const {
        isLoading,
        data,
    } = useQuery('list-all-cv', cvApi.listAllCv);

    console.log(data)

    return (
        <ScreenLayout contentHeight={'100%'} title={'CV của bạn'} icon={'arrow-left'}>
            <View paddingH-10>
                {isLoading ? <LoadingScreen /> :
                    <>
                        {data.length !== 0 ? data.map((item, i) => <CvCard key={i} title={item.title}
                            onPress={() => navigation.navigate('ViewCV', { cv: {}, id: item.id })} />) :
                            <>
                                <NotFound />
                                <Text fs18 font-bold center style={{ marginTop: -100, marginBottom: 50 }}>Bạn chưa tải lên CV nào!</Text>
                            </>
                        }
                        <StyledButton onPress={() => navigation.navigate('UploadCV')} label={'Tải lên CV'} />
                    </>
                }
            </View>
        </ScreenLayout>
    )
}
