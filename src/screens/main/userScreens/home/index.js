import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import { Search, Character2 } from 'assets';
import { boxWithShadow, footer } from 'utilities/boxShadow';
import { useNavigation } from '@react-navigation/native';
import { jobApi } from 'apis';
import { ScreenLayout } from 'screens/components';
import CardScrollView from 'screens/components/CardScrollView';


export const HomeScreen = ({ navigation }) => {
    const navi = useNavigation();
    
    return (
        <ScreenLayout
            title="Home"
            icon="home"
            contentHeight={'100%'}
            notFooter
        >
            <ScrollView
                style={{
                    backgroundColor: '#FFFFFF',
                    height: '100%',
                    position: 'relative'
                }}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{
                        paddingHorizontal: '5%',
                    }}>
                    <View marginT-20 style={{
                        width: '100%',
                        position: 'relative'
                    }}>
                        <TouchableOpacity onPress={() => navi.navigate('SearchFilter')}>
                            <Search style={style.styledIcon} />
                            <View style={style.styledInput}>
                                <Text>Search job</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    height: '5%',
                    marginTop: 20,
                    paddingHorizontal: '5%',
                }}>
                    <Text textBlack fs20 font-medium>
                        Tips for you
                    </Text>
                </View>
                <View style={{
                    paddingHorizontal: '5%',
                    paddingVertical: 10,
                }}>
                    <View style={suggested.container}>
                        <Character2 style={suggested.character} />
                        <View style={{ width: '60%' }}>
                            <Text fs22 textBlack font-bold>How to find a perfect job?</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                marginTop: 25,
                                width: '40%'
                            }}
                            backgroundColor={'transparent'}
                            onPress={() => navi.navigate('Suggest')}
                        >
                            <Text color={'#94C9A9'} fs14 font-light>Read more</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <CardScrollView
                    apiFetcher={jobApi.getRecommendJob}
                    fetcherKey={'get-recommend-job'}
                    params={{
                        title: 'Hot jobs',
                        desc: 'Top high salary job!'
                    }}
                    title={'Job Recommendation'}
                />
            </ScrollView>
        </ScreenLayout>

    );
};

const suggested = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        ...boxWithShadow,
        elevation: 12,
        paddingHorizontal: 10,
        paddingVertical: 14,
        zIndex: 2,
    },
    character: {
        position: 'absolute',
        right: -50,
        bottom: -51,
    },
    footer,
});

const style = StyleSheet.create({
    styledInput: {
        borderStyle: 'solid',
        width: '100%',
        borderWidth: 0,
        borderRadius: 12,
        paddingLeft: 40,
        backgroundColor: '#fff',
        ...boxWithShadow,
        elevation: 12,
        paddingVertical: 10,
        zIndex: 1,
    },
    styledIcon: {
        position: 'absolute',
        top: 9,
        left: 10,
        zIndex: 2,
    },
    character: {
        position: 'absolute',
        bottom: -5,
        right: -20,
    },
});
