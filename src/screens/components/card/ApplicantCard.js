import React from 'react'
import { Image, Text, View, Button } from 'react-native-ui-lib';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { boxWithShadow } from 'utilities/boxShadow';
import { useNavigation } from '@react-navigation/native';

const ApplicantCard = ({ detail, jobId }) => {
    const navi = useNavigation();

    return (
        <TouchableWithoutFeedback onPress={() => navi.navigate('ApproveJob', { userData: detail, jobId })}>
            <View style={cardStyle.container}>
                <View row spread centerV>
                    <Image
                        style={cardStyle.logo}
                        source={{
                            uri: `${detail.avatar}`
                        }} />
                    <Text marginL-70 marginT-20 textBlack fs14 font-bold numberOfLines={1}>{detail.last_name + ' ' + detail.first_name}</Text>
                </View>
                <View marginT-25 row spread>
                    <Button
                        style={
                            {
                                marginRight: 10,
                                marginTop: 10,
                                paddingTop: 5,
                                backgroundColor: 'rgba(41, 114, 254, 1)',
                                width: '50%'
                            }}
                        onPress={() => navi.navigate('ViewCV', {cv: {}, id: detail.cvId})}
                        label='Xem CV'
                    />
                    <Button
                        style={
                            {
                                marginRight: 10,
                                marginTop: 10,
                                paddingTop: 5,
                                backgroundColor: 'rgba(41, 114, 254, 1)',
                                width: '50%'
                            }
                        }
                        onPress={() => navi.navigate('ViewUserProfile', { detail })}
                        label='Xem Profile'
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ApplicantCard;

const cardStyle = StyleSheet.create({
    container: {
        position: 'relative',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
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
        left: 10,
        top: 15,
        zIndex: 2,
        transform: [{
            scale: 1.7
        }],
        width: 30,
        height: 30,
        backgroundColor: 'transparent',
        marginRight: 20,
        borderRadius: 15
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
