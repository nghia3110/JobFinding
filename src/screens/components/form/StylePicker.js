import React from 'react';
import { Text, View, Typography } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { boxWithShadow } from 'utilities/boxShadow';
import { Colors } from 'assets/Colors';
import { Picker } from '@react-native-picker/picker';

export const StyledPicker = ({
    placeholder,
    title,
    error,
    onBlur,
    onChange,
    value,
    data
}) => {
    return (
        <View style={{ position: 'relative' }}>
            <Text fs14 marginB-10 marginL-10>{title}</Text>
            <View style={style.styledInput}>
                <Picker
                    placeholder={placeholder}
                    selectedValue={value}
                    onValueChange={onChange}
                >
                    <Picker.Item value={undefined} label={title.slice(0, title.length - 2)} enabled={false} style={{color: 'rgba(0,0,0,0.5)'}}/>
                    {data.map((el, i) => <Picker.Item key={i} value={el.value} label={el.label} />)}
                </Picker>
            </View>
            {onBlur && <Text marginV-5 marginL-5 marginT-10 fs12 color={Colors.error} font-light>{error}&nbsp;</Text>}
        </View>
    );
};

const style = StyleSheet.create({
    styledInput: {
        borderStyle: 'solid',
        borderWidth: 0,
        borderRadius: 12,
        paddingLeft: 10,
        backgroundColor: '#fff',
        ...boxWithShadow,
        elevation: 12,
        zIndex: 1
    },
});
