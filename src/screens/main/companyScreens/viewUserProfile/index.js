import React from 'react'
import { Image, Text, View } from 'react-native-ui-lib';
import { ScreenLayout, StyledButton } from 'screens/components';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { boxWithShadow } from 'utilities/boxShadow';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const ViewUserProfile = ({ route, navigation }) => {
    const { detail } = route.params;

    return (
        <ScreenLayout contentHeight={'100%'} icon={'arrow-left'} title={'Thông tin hồ sơ'}>
            <ScrollView showsVerticalScrollIndicator={false} height={'100%'} backgroundColor={'#fff'}>
                <View height={'100%'} paddingH-20>
                    <View paddingT-20 row centerV>
                        <Image source={{uri: detail.avatar}} style={{
                                borderRadius: 30
                            }} height={60} width={60} />
                        <View marginL-15>
                            <Text marginB-2 fs19 font-bold
                                textBlack>{`${detail.last_name} ${detail.first_name}`}</Text>
                        </View>
                    </View>
                    <View row paddingH-70 >
                        <View marginT-2 flex row center>
                            <Icon name={'phone-alt'} size={16} color="#000" />
                            <Text marginL-5 marginB-2 fs13 textBlack
                                textAlign={'center'}>{detail.phone}</Text>
                        </View>
                        <View marginT-2 flex row center>
                            <Icon name={'map-marker-alt'} size={16} color="#000" />
                            <Text marginL-5 marginB-2 fs12 textBlack
                                textAlign={'center'}>{detail.address}</Text>
                        </View>
                    </View>
                    <View marginT-20>
                        <Text fs19 textBlack font-bold marginB-10>Học vấn:</Text>
                        {detail.education !== null ?
                            detail.education.map((edu, idx) => <EducationSection
                                edu={edu}
                                key={idx} />)
                            : <Text>Không có thông tin</Text>}
                    </View>
                    <View marginT-20>
                        <Text fs19 textBlack font-bold marginB-10>Kĩ năng:</Text>
                        {detail.skill !== null ? detail.skill.map((skill, idx) => <SkillSection
                            skill={skill}
                            key={idx} />)
                            : <Text>Không có thông tin</Text>
                        }
                    </View>
                    <View marginT-20>
                        <Text fs19 textBlack font-bold marginB-10>Kinh nghiệm:</Text>
                        {detail.experience !== null ?
                            detail.experience.map((exp, idx) => <ExperienceSection
                                exp={exp}
                                key={idx} />)
                            : <Text>Không có thông tin</Text>
                        }
                    </View>
                </View>
            </ScrollView>
        </ScreenLayout>

    )
}

const SkillSection = ({ skill }) => {
    const {
        title,
        description
    } = skill;
    const navi = useNavigation();
    return (
        <View marginT-5 style={styles.infoContainer}>
            <View row centerV marginT-7>
                <Text fs15 textBlack font-medium>Kĩ năng: </Text>
                <Text fs15 textBlack font-light>{title}</Text>
            </View>
            <View centerV marginT-7>
                <Text fs15 textBlack font-medium>Mô tả kĩ năng: </Text>
                <Text fs15 textBlack font-light>{description}</Text>
            </View>
        </View>
    )
}

const ExperienceSection = ({ exp }) => {
    const {
        start,
        end,
        company,
        position
    } = exp;
    const navi = useNavigation();
    return (
        <View marginT-5 style={styles.infoContainer}>
            <View row centerV marginT-7>
                <Text fs15 textBlack font-medium>Thời gian: </Text>
                <Text fs15 textBlack font-light>{start} - {end}</Text>
            </View>
            <View row centerV marginT-7>
                <Text fs15 textBlack font-medium>Công ty: </Text>
                <Text fs15 textBlack font-light>{company}</Text>
            </View>
            <View row centerV marginT-7>
                <Text fs15 textBlack font-medium>Vị trí: </Text>
                <Text fs15 textBlack font-light>{position}</Text>
            </View>
        </View>
    )
}

const EducationSection = ({ edu }) => {
    const {
        start,
        end,
        school,
        major
    } = edu;
    const navi = useNavigation();
    return (
        <View marginT-5 style={styles.infoContainer}>
            <View row centerV marginT-7>
                <Text fs15 textBlack font-medium>Thời gian: </Text>
                <Text fs15 textBlack font-light>{start} - {end}</Text>
            </View>
            <View row centerV marginT-7>
                <Text fs15 textBlack font-medium>Trường: </Text>
                <Text fs15 textBlack font-light>{school}</Text>
            </View>
            <View row centerV marginT-7>
                <Text fs15 textBlack font-medium>Chuyên ngành: </Text>
                <Text fs15 textBlack font-light>{major}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        position: 'relative',
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 15,
        borderRadius: 20,
        ...boxWithShadow,
        elevation: 12,
        borderRadius: 20,
    },
})
