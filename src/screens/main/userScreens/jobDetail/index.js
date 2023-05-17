import React, { useState } from 'react';
import { Text, View } from 'react-native-ui-lib';
import { ScrollView, StyleSheet } from 'react-native';
import { Colors } from 'assets/Colors';
import { ScreenLayout, StyledButton } from 'screens/components';
import { LoadingScreen, Modal } from 'components';
import { useQuery } from 'react-query';
import { jobApi } from 'apis';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from 'hooks';

const handleSalary = (salaryFrom, salaryTo) => {
    if(salaryFrom) {
        if(salaryTo) return `${salaryFrom} - ${salaryTo} triệu`;
        else return `Trên ${salaryFrom} triệu`;
    } else {
        if(salaryTo) return `Tới ${salaryTo} triệu`;
        else return 'Thỏa thuận';
    }
}

export const JobDetail = ({
    route,
    navigation
}) => {
    const [tab, setTab] = useState(1);
    const [viewMore, setViewMore] = useState(false);
    const { id } = route.params;
    const { user } = useAuth();

    const {
        data,
        isLoading
    } = useQuery(['get-job-detail', id, user.userInfo.id], () => jobApi.getjobDetail(id, user.userInfo.id))

    const handleString = (input) => {
        let arr = [];
        if (input.includes('\n')) arr = input.split('\n');
        else arr = input.split('&');
        return arr;
    }

    return (
        <>
            {isLoading && <LoadingScreen />}
            {data &&
                <ScreenLayout
                    title='Thông tin công việc'
                    icon='arrow-left'
                    contentHeight={'100%'}
                >
                    <View backgroundColor={'#FFFFFF'} height={'90%'}>
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
                                                uri: `${data.companyLogo}`
                                            }} />
                                    </View>
                                    <View width={'70%'}>
                                        <Text style={{ width: '100%' }} textBlack fs18 font-extraBold>{data.job_name}</Text>
                                        <Text black50 fs14 font-bold>{data.companyName}</Text>
                                    </View>
                                </View>
                                <View paddingH-35 row spread>
                                    <Text style={tab === 1 ? styles.active : styles.inactive} onPress={() => setTab(1)}>Thông tin công việc</Text>
                                    <Text style={tab === 2 ? styles.active : styles.inactive} onPress={() => setTab(2)}>Thông tin công ty</Text>
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
                                                    <Text fs16 textBlack>{handleSalary(data.salaryFrom, data.salaryTo)}</Text>
                                                </View>
                                            </View>
                                            <View row style={styles.itemInfoContainer}>
                                                <Icon style={styles.iconStyle} name='suitcase' size={24} color="#000" />
                                                <View column>
                                                    <Text fs14 black50 marginB-5>Hình thức làm việc</Text>
                                                    <Text fs16 textBlack>{data.jobType}</Text>
                                                </View>
                                            </View>
                                            <View row style={styles.itemInfoContainer}>
                                                <Icon style={styles.iconStyle} name='user-friends' size={24} color="#000" />
                                                <View column>
                                                    <Text fs14 black50 marginB-5>Số lượng cần tuyển</Text>
                                                    <Text fs16 textBlack>{data.numberNeeded} người</Text>
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
                                                            <Text fs16 textBlack>{data.position}</Text>
                                                        </View>
                                                    </View>
                                                    <View row style={styles.itemInfoContainer}>
                                                        <Icon style={styles.iconStyle} name='map-marker-alt' size={24} color="#000" />
                                                        <View column>
                                                            <Text fs14 black50 marginB-5>Địa điểm</Text>
                                                            <Text fs16 textBlack>{data.location}</Text>
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
                                                handleString(data.job_description).map((line, i) =>
                                                    <Text key={i}>{line}{"\n"}</Text>
                                                )}</Text>
                                        </View>
                                        <View style={styles.infoContainer}>
                                            <Text black50 fs18 font-bold marginB-15>Yêu cầu ứng viên</Text>
                                            <Text fs14>{
                                                handleString(data.job_requirement).map((line, i) =>
                                                    <Text key={i}>{line}{"\n"}</Text>
                                                )}</Text>
                                        </View>
                                        <View style={styles.infoContainer}>
                                            <Text black50 fs18 font-bold marginB-15>Quyền lợi</Text>
                                            <Text fs14>{
                                                handleString(data.job_benefit).map((line, i) =>
                                                    <Text key={i}>{line}{"\n"}</Text>
                                                )}</Text>
                                        </View>
                                    </>
                                }
                                {tab === 2 && 
                                    <View style={styles.infoContainer}>
                                        <Text black50 fs18 font-bold marginB-15>Giới thiệu về công ty</Text>
                                        <Text fs14>{
                                            handleString(data.companyDescription).map((line, i) =>
                                                <Text key={i}>{line}{"\n"}</Text>
                                            )}</Text>
                                    </View>
                               }
                            </View>
                        </ScrollView>
                        <View paddingH-40 marginB-10 backgroundColor={'#FFFFFF'}>
                            {data.status && <StyledButton disabled={true} onPress={() => navigation.navigate('ApplyJob', { jobData: data })} label={data.status} />}
                            {!data.status && <StyledButton onPress={() => navigation.navigate('ApplyJob', { jobData: data })} label={'Ứng tuyển'} />}
                        </View>
                    </View>
                </ScreenLayout>}
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
    active: {
        borderBottomWidth: 2,
        fontWeight: '600',
        borderColor: '#83ea9a'
    },
    inactive: {
        color: Colors.black45,
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