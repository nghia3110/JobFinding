import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { ScrollView, StyleSheet } from 'react-native';
import { Colors } from 'assets/Colors';
import { ScreenLayout } from 'screens/components';
import { LoadingScreen } from 'components';
import { companyApi } from 'apis';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from 'hooks';
import { useQuery } from 'react-query';
import ApplicantCard from 'screens/components/card/ApplicantCard';

const handleSalary = (salaryFrom, salaryTo) => {
    if(salaryFrom) {
        if(salaryTo) return `${salaryFrom} - ${salaryTo} triệu`;
        else return `Trên ${salaryFrom} triệu`;
    } else {
        if(salaryTo) return `Tới ${salaryTo} triệu`;
        else return 'Thỏa thuận';
    }
}

export const JobManager = ({
    route,
    navigation
}) => {
    const [tab, setTab] = useState(1);
    const [viewMore, setViewMore] = useState(false);
    const { jobData } = route.params;
    const { company } = useAuth();

    const {
        data,
        isLoading
    } = useQuery(['get-applicant', jobData.id], () => companyApi.getApplicants(jobData.id));

    const handleString = (input) => {
        let arr = [];
        if (input.includes('\n')) arr = input.split('\n');
        else arr = input.split('&');
        return arr;
    }

    return (
        <>
            {isLoading && <LoadingScreen />}
            <ScreenLayout
                title='Quản lý công việc'
                icon='arrow-left'
                contentHeight={'100%'}
            >
                <View backgroundColor={'#FFFFFF'} height={'90%'}>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        top: -48,
                        right: 15
                    }}
                        onPress={() => navigation.navigate('UpdateJob', { jobData })}>
                        <Icon name='edit' size={24} color="#000" />
                    </TouchableOpacity>
                    <ScrollView>
                        <View style={styles.container}>
                            <View paddingB-20 row spread center marginB-20>
                                <View>
                                    <Image
                                        style={{
                                            width: 70,
                                            height: 70,
                                            backgroundColor: 'transparent',
                                            marginRight: 20
                                        }}
                                        source={{
                                            uri: `${company.companyInfo.companyLogo}`
                                        }} />
                                </View>
                                <View width={'70%'}>
                                    <Text style={{ width: '100%' }} textBlack fs18 font-extraBold>{jobData.job_name}</Text>
                                    <Text black50 fs14 font-bold>{company.companyInfo.companyName}</Text>
                                </View>
                            </View>
                            <View paddingH-35 row spread>
                                <Text style={tab === 1 ? styles.active : styles.inactive} onPress={() => setTab(1)}>Thông tin công việc</Text>
                                <Text style={tab === 2 ? styles.active : styles.inactive} onPress={() => setTab(2)}>Người ứng tuyển</Text>
                            </View>
                        </View>
                        <View style={styles.descContainer}>
                            {tab === 1 &&
                                <>
                                    <View style={styles.infoContainer}>
                                        <Text black50 fs18 font-bold>Thông tin chung</Text>
                                        <View row style={styles.itemInfoContainer}>
                                            <Icon style={styles.iconStyle} name='money-bill-wave' size={24} color="#000" />
                                            <View column>
                                                <Text fs14 black50 marginB-5>Mức lương</Text>
                                                <Text fs16 textBlack>{handleSalary(jobData.salaryFrom, jobData.salaryTo)}</Text>
                                            </View>
                                        </View>
                                        <View row style={styles.itemInfoContainer}>
                                            <Icon style={styles.iconStyle} name='suitcase' size={24} color="#000" />
                                            <View column>
                                                <Text fs14 black50 marginB-5>Hình thức làm việc</Text>
                                                <Text fs16 textBlack>{jobData.jobType}</Text>
                                            </View>
                                        </View>
                                        <View row style={styles.itemInfoContainer}>
                                            <Icon style={styles.iconStyle} name='user-friends' size={24} color="#000" />
                                            <View column>
                                                <Text fs14 black50 marginB-5>Số lượng cần tuyển</Text>
                                                <Text fs16 textBlack>{jobData.numberNeeded} người</Text>
                                            </View>
                                        </View>
                                        {!viewMore && <Text marginT-10 center
                                            style={{
                                                fontWeight: 700,
                                                color: '#1DCA0C'
                                            }}
                                            onPress={() => { setViewMore(!viewMore) }}
                                        >
                                            Xem thêm
                                        </Text>}
                                        {viewMore &&
                                            <>
                                                <View row style={styles.itemInfoContainer}>
                                                    <Icon style={styles.iconStyle} name='id-card-alt' size={24} color="#000" />
                                                    <View column>
                                                        <Text fs14 black50 marginB-5>Chức vụ</Text>
                                                        <Text fs16 textBlack>{jobData.position}</Text>
                                                    </View>
                                                </View>
                                                <View row style={styles.itemInfoContainer}>
                                                    <Icon style={styles.iconStyle} name='map-marker-alt' size={24} color="#000" />
                                                    <View column>
                                                        <Text fs14 black50 marginB-5>Địa điểm</Text>
                                                        <Text fs16 textBlack>{jobData.location}</Text>
                                                    </View>
                                                </View>
                                                <Text marginT-10 center
                                                    style={{
                                                        fontWeight: 700,
                                                        color: '#1DCA0C'
                                                    }}
                                                    onPress={() => { setViewMore(!viewMore) }}
                                                >
                                                    Thu gọn
                                                </Text>
                                            </>}
                                    </View>
                                    <View style={styles.infoContainer}>
                                        <Text black50 fs18 font-bold marginB-15>Mô tả công việc</Text>
                                        <Text fs14>{
                                            handleString(jobData.job_description).map((line, i) =>
                                                <Text key={i}>{line}{"\n"}</Text>
                                            )}</Text>
                                    </View>
                                    <View style={styles.infoContainer}>
                                        <Text black50 fs18 font-bold marginB-15>Yêu cầu ứng viên</Text>
                                        <Text fs14>{
                                            handleString(jobData.job_requirement).map((line, i) =>
                                                <Text key={i}>{line}{"\n"}</Text>
                                            )}</Text>
                                    </View>
                                    <View style={styles.infoContainer}>
                                        <Text black50 fs18 font-bold marginB-15>Quyền lợi</Text>
                                        <Text fs14>{
                                            handleString(jobData.job_benefit).map((line, i) =>
                                                <Text key={i}>{line}{"\n"}</Text>
                                            )}</Text>
                                    </View>
                                </>
                            }
                            {tab === 2 &&
                                <View width={'100%'} paddingB-0 paddingH-10>
                                    <View paddingV-25>
                                        {data && data.map((el, i) => <ApplicantCard key={i} detail={el} jobId={jobData.id} />)}
                                    </View>
                                </View>
                            }
                        </View>
                    </ScrollView>
                </View>
            </ScreenLayout>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: '#fff',
    },
    descContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    active: {
        borderBottomWidth: 2,
        fontWeight: '600',
        borderColor: '#83ea9a'
    },
    inactive: {
        color: Colors.black45,
    },
    infoContainer: {
        position: 'relative',
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 15,
        borderRadius: 20
        /* ...boxWithShadow,
        elevation: 12,
        borderRadius: 20, */
    },
    itemInfoContainer: {
        alignItems: 'center',
        paddingTop: 20,
        marginBottom: 10
    },
    iconStyle: {
        width: '15%'
    }
})