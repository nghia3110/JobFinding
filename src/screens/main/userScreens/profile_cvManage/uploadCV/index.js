import React, { useEffect, useState } from 'react';
import { Text, TextField, View } from 'react-native-ui-lib';
import { ScreenLayout, StyledButton } from 'screens/components';
import { useMutation, useQuery } from 'react-query';
import { cvApi } from 'apis';
import { LoadingScreen } from 'components';
import { StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CurvedTransition } from 'react-native-reanimated';

export const UploadCV = ({
    navigation
}) => {
    const [cvTitle, setCvTitle] = useState();
    const [cvFile, setCVFile] = useState();

    const {
        isLoading,
        data,
        error,
        mutate: uploadCVHandler
    } = useMutation(cvApi.uploadCV)

    const onUploadCV = () => {
        const data = new FormData();
        data.append('title', cvTitle || cvFile[0].name);
        if (cvFile) { data.append('file', cvFile[0]); }

        uploadCVHandler(data);
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
        setCvTitle(value);
    }

    useEffect(() => {
        if (data !== undefined) {
            setTimeout(() => {
                navigation.navigate('ListCv');
            }, 1000);
        }
    }, [data])

    return (
        <ScreenLayout title={'Tải lên CV'} icon={'arrow-left'} contentHeight={'100%'}>
            {isLoading && <LoadingScreen />}
            <ScrollView backgroundColor={'#FFFFFF'} height={'90%'}>
                <View paddingH-15 backgroundColor={'#FFFFFF'}>
                    <View paddingH-10 paddingT-10 style={styles.container}>
                        <View row spread centerV paddingB-15>
                            <Text fs16>
                                Tiêu đề của CV:
                            </Text>
                        </View>
                        <View>
                            <TextField
                                placeholder='Tiêu đề của CV'
                                placeholderTextColor={'rgba(0,0,0,0.6)'}
                                value={cvTitle}
                                onChangeText={handleChange}
                                style={styles.styledInput}
                            />
                        </View>
                    </View>
                    <View paddingH-10 paddingT-10 style={styles.container}>
                        <View row spread centerV paddingB-15>
                            <Text fs16>
                                Chọn file từ điện thoại
                            </Text>
                        </View>
                        {!cvFile &&
                            <TouchableOpacity
                                style={{ width: '100%', height: 100, backgroundColor: '#f9f9f9' }}
                                onPress={pickPDF}
                            >
                                <Text fs14 flex center>
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
                </View>
            </ScrollView>
            <View paddingH-40 backgroundColor={'#FFFFFF'}>
                <StyledButton onPress={() => onUploadCV()} label={'Tải lên CV'} />
            </View>
        </ScreenLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderBottomColor: 'rgba(235, 238, 242, 1)',
        borderBottomWidth: 1
    },
    styledInput: {
        borderStyle: 'solid',
        borderColor: '#d9d9d9',
        borderWidth: 1,
        paddingTop: 10,
        paddingLeft: 10,
        backgroundColor: '#fff',
        zIndex: 1,
    },
})
