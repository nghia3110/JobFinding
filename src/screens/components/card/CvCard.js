import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { randomCatalog } from 'utilities';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { ExpandRight } from 'assets';
import { boxWithShadow } from 'utilities/boxShadow';

export const CvCard = ({
                           title,
                           onPress
                       }) => {

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container} marginT-15 paddingV-15 paddingR-10 paddingL-15 row spread centerV>
                <View row centerV>
                    <Text fs16 textBlack font-medium marginL-15>
                        {title}
                    </Text>
                </View>
                <ExpandRight/>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        ...boxWithShadow,
        elevation: 15,
        backgroundColor: '#f5f5f5',
        borderRadius: 15,
    },
    icon: {
        transform: [{
            scale: 1.2
        }],
    }
})
