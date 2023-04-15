import React from 'react';
import { Text, View } from 'react-native-ui-lib';
import { Footer } from 'assets';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export const ScreenLayout = ({
                                 children,
                                 icon,
                                 title,                                
                                 contentHeight,
                                 notFooter
                             }) => {
                                const navigate = useNavigation();
    return (
        <View flex spread>
            <View style={{
                height: contentHeight,
                zIndex: 1
            }}>
                <View style={styles.header} row>
                    {icon == 'home' && <Icon name={icon} size={20} color="#000" />}
                    {icon == 'arrow-left' && <Icon name={icon} size={20} color="#000" 
                    onPress={() => navigate.goBack()}
                    />}
                    <Text fs18 textBlack font-semiBold>    {title}</Text>
                </View>
                {children}
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: '10%',
        position: 'relative',
        paddingTop: 10,
        paddingHorizontal: 20,
        marginBottom: 0,
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
    },
});
