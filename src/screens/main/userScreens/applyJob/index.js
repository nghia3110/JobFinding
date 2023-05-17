import React, { useEffect, useState } from 'react';
import { Text, TextField, View, Toast } from 'react-native-ui-lib';
import { ScreenLayout, StyledButton } from 'screens/components';
import { useMutation, useQuery } from 'react-query';
import { cvApi, userApi } from 'apis';
import { LoadingScreen } from 'components';
import Modal from 'react-native-modal';
import { StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import { RadioButton } from 'react-native-paper';
import { Close } from 'assets';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const ApplyJob = ({
    route,
    navigation
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isNotiVisible, setIsNotiVisible] = useState(false);
    const [cvTitle, setCvTitle] = useState();
    const [cvFile, setCVFile] = useState();
    const [description, setDescription] = useState();
    const [selected, setSelected] = useState('choose');
    const { jobData } = route.params;

    const {
        data,
        error,
        mutate: applyJobHandler
    } = useMutation(userApi.applyJob)

    const {
        data: resData,
        isLoading
    } = useQuery('list-all-cv', cvApi.listAllCv);

    const onApplyJob = () => {
        const data = new FormData();
        data.append('jobId', jobData.id);
        data.append('title', cvTitle || cvFile[0].name);
        if (cvFile) { data.append('file', cvFile[0]); }
        data.append('description', description || 'Không có')

        applyJobHandler(data);
    }

    const pickPDF = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            setCVFile(result);
        } catch (err) {
            console.log('Error picking PDF', err);
        }
    }

    const handleChange = (value) => {
        setDescription(value)
    }

    useEffect(() => {
        if (data !== undefined) {
            setIsNotiVisible(true);
            setTimeout(() => {
                setIsNotiVisible(false);
                navigation.navigate('AppliedJobs');
            }, 1000);
        }
    }, [data])

    return (
        <ScreenLayout title={'Ứng tuyển'} icon={'arrow-left'} contentHeight={'100%'} notFooter>
            {isLoading && <LoadingScreen />}
            <ScrollView backgroundColor={'#FFFFFF'} height={'90%'}>
                <View paddingH-15 backgroundColor={'#FFFFFF'}>
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
                                        uri: `${jobData.companyLogo}`
                                    }} />
                            </View>
                            <View width={'70%'}>
                                <Text style={{ width: '100%' }} textBlack fs18 font-extraBold>{jobData.job_name}</Text>
                                <Text black50 fs14 font-bold>{jobData.companyName}</Text>
                            </View>
                        </View>
                    </View>
                    <Modal isVisible={isVisible} animationIn={'slideInUp'}>
                        <View paddingH-20 paddingV-25 spread style={styles.modalBody}>
                            <Text fs18 textBlack font-medium>Bạn có muốn xem lại CV trước khi ứng tuyển không?</Text>
                            <StyledButton
                                onPress={onApplyJob}
                                label={'Ứng tuyển ngay'}
                                color={{ fontSize: 18 }}
                            />
                            {/* <StyledButton
                                onPress={() => {
                                    navigation.navigate('ViewCV', { cv: cvFile[0] })
                                    setIsVisible(false)
                                }}
                                label={'Xem lại CV'}

                                color={{ fontSize: 18 }}
                            /> */}
                            <TouchableOpacity
                                onPress={() => setIsVisible(false)}
                                style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: 10,
                                    zIndex: 1,
                                }}
                            >
                                <Close />
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <Modal isVisible={isNotiVisible} animationIn={'slideInUp'}>
                        <View paddingH-20 paddingV-25 row centerV centerH style={styles.modalBody}>
                            <Icon style={{marginRight: 10}} name={'check'} size={25} color="#11bd2b" />
                            <Text fs18>Ứng tuyển thành công!</Text>
                        </View>
                    </Modal>
                    <View paddingH-10 paddingT-10 style={styles.container}>
                        <View row spread centerV paddingB-15>
                            <Text fs16
                                style={selected === 'choose' ? '' : styles.disableText}
                            >
                                Chọn CV đã tải lên
                            </Text>
                            <RadioButton
                                value="choose"
                                status={selected === 'choose' ? 'checked' : 'unchecked'}
                                onPress={() => setSelected('choose')}
                                color='#1DCA0C'
                            />
                        </View>
                        <Picker
                            placeholder='Chọn CV'
                            selectedValue={cvTitle}
                            style={{ height: 50, width: '100%', backgroundColor: '#f9f9f9' }}
                            enabled={selected === 'choose' ? true : false}
                            onValueChange={(itemValue, itemIndex) => setCvTitle(itemValue)}
                            mode='dropdown'
                        >
                            <Picker.Item label='Chọn CV' enabled={false} />
                            {resData && resData.map((item, i) => (
                                <Picker.Item key={i} value={item.title} label={item.title} />
                            ))}
                        </Picker>

                    </View>
                    <View paddingH-10 paddingT-10 style={styles.container}>
                        <View row spread centerV paddingB-15>
                            <Text fs16
                                style={selected === 'upload' ? '' : styles.disableText}
                            >
                                Tải CV từ điện thoại
                            </Text>
                            <RadioButton
                                value="upload"
                                status={selected === 'upload' ? 'checked' : 'unchecked'}
                                onPress={() => setSelected('upload')}
                                color='#1DCA0C'
                            />
                        </View>
                        {!cvFile &&
                            <TouchableOpacity
                                style={{ width: '100%', height: 100, backgroundColor: '#f9f9f9' }}
                                disabled={selected === 'upload' ? false : true}
                                onPress={pickPDF}
                            >
                                <Text fs14 flex center
                                    style={selected === 'upload' ? '' : styles.disableText}
                                >
                                    Chọn file PDF của bạn
                                </Text>
                            </TouchableOpacity>
                        }
                        {cvFile &&
                            <TouchableOpacity
                                style={{ width: '100%', height: 100, backgroundColor: '#f9f9f9' }}
                                onPress={() => {
                                    navigation.navigate('ViewCV', { cv: cvFile[0], id: '' })
                                }}
                            >
                                <Text fs14 flex center>
                                    {cvFile[0].name}
                                </Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <View paddingH-10 paddingT-10 style={styles.container}>
                        <View marginB-15>
                            <Text fs16>Giới thiệu về bản thân</Text>
                        </View>
                        <View>
                            <TextField
                                placeholder='Viết ngắn gọn giới thiệu về bản thân'
                                placeholderTextColor={'rgba(0,0,0,0.6)'}
                                value={description}
                                onChangeText={handleChange}
                                style={styles.styledInput}
                                multiline={true}
                                numberOfLines={5}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View paddingH-40 backgroundColor={'#FFFFFF'}>
                <StyledButton onPress={() => setIsVisible(true)} label={'Xác nhận'} />
            </View>
        </ScreenLayout>
    )
}

const styles = StyleSheet.create({
    modalBody: {
        position: 'relative',
        backgroundColor: '#fff',
        borderRadius: 15
    },
    container: {
        position: 'relative',
        width: '100%',
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderBottomColor: 'rgba(235, 238, 242, 1)',
        borderBottomWidth: 1
    },
    disableText: {
        color: 'rgba(235, 238, 242, 1)'
    },
    styledInput: {
        borderStyle: 'solid',
        borderColor: '#d9d9d9',
        borderWidth: 1,
        paddingTop: 10,
        paddingLeft: 10,
        backgroundColor: '#fff',
        zIndex: 1,
        textAlignVertical: 'top'
    },
})
