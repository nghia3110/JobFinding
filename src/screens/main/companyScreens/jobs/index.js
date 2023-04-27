import { ScreenLayout } from 'screens/components';
import { ScrollView, StyleSheet } from 'react-native';
import { View, TouchableOpacity } from 'react-native-ui-lib';
import JobCard from 'screens/components/card/JobCard';
import React from 'react';
import { useQuery } from 'react-query';
import { LoadingScreen } from 'components';
import { companyApi } from 'apis';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

export const Jobs = () => {
    const navi = useNavigation();
    const {
        data,
        isLoading
    } = useQuery('get-all-company-job', companyApi.getAllCompanyJobs);

    return (
        <>
            {isLoading && <LoadingScreen />}
            <ScreenLayout title='Công việc' icon='arrow-left' contentHeight={'100%'}
                notFooter>
                <TouchableOpacity style={styles.iconStyle}
                    onPress={() => navi.navigate('CreateJob')}>
                    <Icon style={styles.iconStyle} name='plus' size={24} color="#000" />
                </TouchableOpacity>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View width={'100%'} paddingB-40 paddingH-20>
                        <View paddingV-25>
                            {data && data.map((el, i) => <JobCard key={i} detail={el} />)}
                        </View>
                    </View>
                </ScrollView>
            </ScreenLayout>
        </>
    )
}

const styles = StyleSheet.create({
    iconStyle: {
        position: 'absolute',
        top: 15,
        right: 10
    }
})
