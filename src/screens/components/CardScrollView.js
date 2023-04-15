import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import WideJobCard from 'screens/components/card/WideJobCard';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import { LoadingScreen } from 'components';

const CardScrollView = ({
    title,
    params,
    apiFetcher,
    fetcherKey
}) => {
    const navigate = useNavigation();

    const {
        data,
        isLoading
    } = useQuery(fetcherKey, apiFetcher);

    return (
        <>
            {isLoading && <LoadingScreen />}
            {data && (
                <>
                    <View style={{
                        height: '5%',
                        marginTop: 20,
                        paddingHorizontal: '5%',
                    }}>
                        <View flex row spread centerV>
                            <Text textBlack fs18 font-medium>
                                {title}
                            </Text>
                            <TouchableOpacity backgroundColor={'transparent'}
                                onPress={() => navigate.navigate('JobList')}>
                                <Text textBlack fs14 font-light>{params ? 'See all' : ''}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View width={'100%'} paddingB-0 paddingH-10>
                        <View paddingV-25 marginL-10 marginR-10>
                            {data && data.map((el, i) => <WideJobCard key={i} detail={el} />)}
                        </View>
                    </View>
                </>
            )}
        </>
    );
};

export default CardScrollView;
