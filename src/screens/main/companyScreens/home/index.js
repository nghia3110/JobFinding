import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import { Search, Character2 } from 'assets';
import { boxWithShadow, footer } from 'utilities/boxShadow';
import { useNavigation } from '@react-navigation/native';
import { companyApi } from 'apis';
import { ScreenLayout } from 'screens/components';
import CardScrollView from 'screens/components/CardScrollView';
import { useAuth } from 'hooks';
import JobCard from 'screens/components/card/JobCard';


export const CompanyHomeScreen = ({ navigation }) => {
    const navi = useNavigation();
    const { company } = useAuth();
    const title = company ? `Xin chào, ${company.companyInfo.companyName}` : 'Xin chào';

    return (
        <ScreenLayout
            title={title}
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
            <CardScrollView 
                apiFetcher={companyApi.getCompanyJobs}
                fetcherKey={'get-job-by-company'}
                params={{
                    title: 'Jobs',
                    desc: 'Company Jobs'
                }}
                title={'Công việc đã đăng tuyển'}
                navigateTo={'Jobs'}
                
            />
            </ScrollView>
        </ScreenLayout>

    );
};

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
