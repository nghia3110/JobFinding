import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native-ui-lib';
import { CvCard, ScreenLayout, StyledButton } from 'screens/components';
import { useMutation, useQuery } from 'react-query';
import { cvApi, jobApi } from 'apis';
import { LoadingScreen } from 'components';
import Modal from 'react-native-modal';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import { RadioButton } from 'react-native-paper';
import { Close } from 'assets';


export const ApplyJob = ({
    route,
    navigation
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [cvTitle, setCvTitle] = useState();
    const [cvFile, setCVFile] = useState();
    const [selected, setSelected] = useState('choose');
    const { jobData } = route.params;

    const {
        data,
        error,
        mutate: applyJobHandler
    } = useMutation(jobApi.applyJob)

    const {
        data: resData,
        isLoading
    } = useQuery('list-all-cv', cvApi.listAllCv);

    const onApplyJob = () => {
        const data = new FormData();
        data.append('jobId', jobData.id);
        data.append('title', cvTitle);
        data.append('file', cvFile);

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

    useEffect(() => {

    }, [data, error])

    return (
        <ScreenLayout title={'Ứng tuyển'} icon={'arrow-left'} contentHeight={'100%'} notFooter>
            <View paddingH-15 backgroundColor={'#FFFFFF'}>
                {isLoading && <LoadingScreen />}
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
                                    uri: `${jobData.logo}`
                                }} />
                        </View>
                        <View width={'70%'}>
                            <Text style={{ width: '100%' }} textBlack fs18 font-extraBold>{jobData.job_name}</Text>
                            <Text black50 fs14 font-bold>{jobData.companyName}</Text>
                        </View>
                    </View>
                </View>
                <Modal isVisible={isVisible} animationIn={'slideInUp'} animationOut={'slideInDown'}>
                    <View paddingH-20 paddingV-25 spread style={styles.modalBody}>
                        <Text fs18 textBlack font-medium>Bạn có muốn xem lại CV trước khi ứng tuyển không?</Text>
                        <StyledButton
                            onPress={onApplyJob}
                            label={'Ứng tuyển ngay'}
                            color={{ fontSize: 18 }}
                        />
                        <StyledButton
                            onPress={() => {
                                navigation.navigate('CvDetail', { id: cvId })
                                setIsVisible(false)
                            }}
                            label={'Xem lại CV'}

                            color={{ fontSize: 18 }}
                        />
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
                            <Text flex center
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
                                navigation.navigate('ViewCV', { cv: cvFile[0] })
                            }}
                        >
                            <Text>
                                {cvFile[0].name}
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
                <View paddingH-10 paddingT-10 style={styles.container}>
                    <Text fs16>Giới thiệu về bản thân</Text>
                </View>
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
    }
})
