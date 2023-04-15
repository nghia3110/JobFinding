import React from 'react'
import { ScreenLayout } from 'screens/components';
import { Text, View } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

export const ViewCV = ( {route} ) => {
    const { cv } = route.params;
    const source = {uri: cv.uri};
    return (
        <ScreenLayout title={'Chi tiết CV'} icon={'arrow-left'} contentHeight={'100%'}
                      notFooter>
            <View style={styles.container} backgroundColor={'#ffffff'} height={'100%'} paddingH-20>
                
            <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}/>
            </View>
        </ScreenLayout>
    )
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pdf: {
        flex:1,
        width:'100%',
        height:'100%',
    }
});