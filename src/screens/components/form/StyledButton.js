import { Button } from 'react-native-ui-lib';
import React from 'react';
import { StyleSheet } from 'react-native';
//import { Fonts } from 'assets/Fonts';

export const StyledButton = ({
                                 label,
                                 onPress,
                                 bg,
                                 color,
                                 width = '100%'
                             }) => {
    return (
        <Button
            style={[style.button, {
                width
            }]}
            labelStyle={[style.font, color]}
            label={label}
            backgroundColor={bg || 'rgba(41, 114, 254, 1)'}
            onPress={onPress}
        />
    );
};

const style = StyleSheet.create({
    button: {
        borderRadius: 32,
        elevation: 10,
        fontStyle: 24,
        width: '100%',
        zIndex: 10,
        marginTop: 15
    },
    font: {
        fontSize: 18,
        fontFamily: 'Source Sans Pro',
        color: '#FFFFFF',
    },
});
