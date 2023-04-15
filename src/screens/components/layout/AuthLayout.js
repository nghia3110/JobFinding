import React from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import { Images } from 'assets';
import { StyleSheet } from 'react-native';

export const AuthLayout = ({children, contentHeight}) => {
    return (
        <View flex spread>
            <View style={{
                height: contentHeight,
                zIndex: 1,
                flexDirection: 'column'
            }}>
                <View style={styles.imageView}>
                   <Image style={styles.image} source={Images.job_finding}/>
                </View>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imageView: {
        width: '100%',
        alignItems: 'center'
    },

    image: {
        width: 250,
        height: 250,
        resizeMode: 'center'
    }
});
