import React, { useState } from 'react';
import { Incubator, Text, View } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { boxWithShadow } from 'utilities/boxShadow';
import { Colors } from 'assets/Colors';

const { TextField } = Incubator;

export const StyledTextArea = ({
    placeholder,
    type,
    title,
    error,
    onBlur,
    onChange,
    value
}) => {
    const [height, setHeight] = useState(50);
    return (
        <View style={{ position: 'relative' }}>
            <Text fs14 marginB-10 marginL-10>{title}</Text>
            <TextField
                placeholder={placeholder}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[style.styledInput, { marginTop: onBlur ? 0 : 5 }, { height: Math.max(50, height) }]}
                secureTextEntry={type === 'password'}
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                multiline={true}
                onContentSizeChange={(event) => {
                    if (height <= (50 * 6)) {
                        setHeight(event.nativeEvent.contentSize.height)
                    }
                }
                }
            />
            {/* <Icon style={style.icon}/> */}
            {onBlur && <Text marginV-5 marginL-5 marginT-10 fs12 color={Colors.error} font-light>{error}&nbsp;</Text>}
        </View>
    );
};

const style = StyleSheet.create({
    styledInput: {
        borderStyle: 'solid',
        borderWidth: 0,
        borderRadius: 12,
        paddingLeft: 15,
        backgroundColor: '#fff',
        ...boxWithShadow,
        elevation: 12,
        paddingTop: 6,
        paddingBottom: 6,
        zIndex: 1,
        //textAlignVertical: 'top'
    },
    /* icon: {
        position: 'absolute',
        top: 13,
        left: 10,
        zIndex: 2,
    }, */
});
