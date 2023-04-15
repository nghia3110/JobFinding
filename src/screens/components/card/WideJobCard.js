import React from 'react'
import { Image, Text, View } from 'react-native-ui-lib';
import { Location } from 'assets';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { boxWithShadow } from 'utilities/boxShadow';
import { useNavigation } from '@react-navigation/native';
import { randomCatalog } from 'utilities';

const WideJobCard = ({ detail }) => {
    const navi = useNavigation()
    const Icon = randomCatalog();
    const id = detail.id;

    return (
        <TouchableWithoutFeedback onPress={() => navi.navigate('JobDetail', { id })}>
            <View style={cardStyle.container}>
                <Image
                    style={cardStyle.logo}
                    source={{
                        uri: `${detail.logo}`
                    }} />
                <Text paddingT-10 textBlack fs14 font-bold numberOfLines={1}>{detail.job_name}</Text>
                <Text black50 fs12 font-bold>{detail.companyName}</Text>
                <Text marginT-5 textBlack fs12 font-medium>{detail.salary}</Text>
                <View marginT-2 flex row centerV spread>
                    <View row>
                        <Location />
                        <Text black50 fs10 >{detail.location || 'Hanoi'}</Text>
                    </View>
                    <Text fs10 style={cardStyle.categoryTag} textBlack>Cần tuyển {detail.numberNeeded} nhân viên</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default WideJobCard;

const cardStyle = StyleSheet.create({
    container: {
        position: 'relative',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 80,
        paddingRight: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        ...boxWithShadow,
        elevation: 12,
        zIndex: 1,
        marginBottom: 20,
    },
    logo: {
        position: 'absolute',
        left: 25,
        top: 30,
        zIndex: 2,
        transform: [{
            scale: 1.7
        }],
        width: 30,
        height: 30,
        backgroundColor: 'transparent',
        marginRight: 20
    },
    timeLeft: {
        position: 'absolute',
        right: 15,
        top: 35,
    },
    categoryTag: {
        backgroundColor: 'rgb(226,245,255)',
        paddingHorizontal: 10,
        paddingTop: 2,
        height: 20,
        borderRadius: 25,
        marginRight: 5,
        ...boxWithShadow,
        elevation: 5,
    },
})
