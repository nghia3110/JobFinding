import React from 'react'
import { Image, Text, View } from 'react-native-ui-lib';
import { Location } from 'assets';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { boxWithShadow } from 'utilities/boxShadow';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from 'hooks';

const AppliedJobCard = ({ detail }) => {
    const navi = useNavigation();
    

    return (
        <TouchableWithoutFeedback onPress={() => navi.navigate('ApplicationDetail', { detail })}>
            <View style={cardStyle.container}>
                <Image
                    style={cardStyle.logo}
                    source={{
                        uri: `${detail.companyLogo}`
                    }} />
                <Text paddingT-10 textBlack fs14 font-bold numberOfLines={1}>{detail.job_name}</Text>
                <Text marginT-5 black50 fs12 font-bold>{detail.companyName}</Text>
                <View marginT-10 flex row centerV spread>
                    <Text fs10 style={cardStyle.categoryTag} textBlack>{detail.status}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default AppliedJobCard;

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
