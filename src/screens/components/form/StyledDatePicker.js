import React from 'react';
import { Text, View, DateTimePicker } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { boxWithShadow } from 'utilities/boxShadow';
import { Colors } from 'assets/Colors';

export const StyledDatePicker = ({
                                     placeholder,
                                     type,
                                     title,
                                     error,
                                     onBlur,
                                     onChange,
                                     value
                                 }) => {
    return (
        <View style={{ position: 'relative' }}>
            <Text fs14 marginB-10 marginL-10>{title}</Text>
            <DateTimePicker
                placeholder={placeholder}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={style.styledInput}
                value={value}
                mode={'date'}
                onBlur={onBlur}
                onChange={(date) => onChange(date)}         
            />
            {/* <Icon style={style.icon}/> */}
            <Text marginV-5 marginL-40 fs12 color={Colors.error} font-light>{error}&nbsp;</Text>
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
        elevation: 13,
        paddingTop: 6,
        paddingBottom: 6,
        zIndex: 1,
    },
    icon: {
        position: 'absolute',
        top: 13,
        left: 10,
        zIndex: 2,
    },
});
