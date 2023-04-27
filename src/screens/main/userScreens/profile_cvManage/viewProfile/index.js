import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { ScreenLayout, StyledButton } from 'screens/components';
import { ScrollView, StyleSheet } from 'react-native';
import { useAuth } from 'hooks';
import { useNavigation } from '@react-navigation/native';
import { boxWithShadow } from 'utilities/boxShadow';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const ViewProfile = ({ navigation }) => {
    const { user } = useAuth();

    return (
        <ScreenLayout contentHeight={'100%'} icon={'arrow-left'} title={'Thông tin hồ sơ'}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View backgroundColor={'#ffffff'} height={'100%'} paddingH-20>
                    <View paddingT-10 row centerV>
                        <Image source={{ uri: user.userInfo.avatar }} style={{ borderRadius: 30 }} height={60} width={60} />
                        <View marginL-15>
                            <Text marginB-2 fs18 font-bold
                                textBlack>{`${user.userInfo.first_name} ${user.userInfo.last_name}`}</Text>
                            <Text marginT-2 fs14 font-medium
                                black50>{user.email}</Text>
                        </View>
                    </View>
                    <View row paddingH-70 >
                        <View marginT-2 flex row center>
                            <Icon name={'phone-alt'} size={16} color="#000" />
                            <Text marginL-5 marginB-2 fs13 textBlack
                                textAlign={'center'}>{user.userInfo.phone}</Text>
                        </View>
                        <View marginT-2 flex row center>
                            <Icon name={'map-marker-alt'} size={16} color="#000" />
                            <Text marginL-5 marginB-2 fs12 textBlack
                                textAlign={'center'}>{user.userInfo.address}</Text>
                        </View>
                    </View>
                    <View marginT-20>
                        <Text fs18 textBlack font-bold marginB-10>Học vấn:</Text>
                        {user.userInfo.education !== null ?
                            user.userInfo.education.map((edu, idx) => <EducationSection
                                edu={edu}
                                key={idx} />)
                            : <Text>Không có thông tin</Text>}
                    </View>
                    <View marginT-20>
                        <Text fs19 textBlack font-bold marginB-10>Kĩ năng:</Text>
                        {user.userInfo.skill !== null ?
                            user.userInfo.skill.map((skill, idx) => <SkillSection
                                skill={skill}
                                key={idx} />)
                            : <Text>Không có thông tin</Text>
                        }
                    </View>
                    <View marginT-20>
                        <Text fs19 textBlack font-bold marginB-10>Kinh nghiệm:</Text>
                        {user.userInfo.experience !== null ?
                            user.userInfo.experience.map((exp, idx) => <ExperienceSection
                                exp={exp}
                                key={idx} />)
                            : <Text>Không có thông tin</Text>
                        }
                    </View>

                    <View marginV-50>
                        <StyledButton
                            label={'Cập nhật thông tin'}
                            onPress={() => {
                                navigation.navigate('UpdateProfile')
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </ScreenLayout>

    )
}

const SkillSection = ({ skill }) => {
    const {
        id,
        title,
        description
    } = skill;
    const navi = useNavigation();
    return (
        <View marginT-5 row spread style={styles.infoContainer}>
            <View>
                <View row centerV marginT-7>
                    <Text fs15 textBlack font-medium>Kĩ năng: </Text>
                    <Text fs15 textBlack font-light>{title}</Text>
                </View>
                <View centerV marginT-7>
                    <Text fs15 textBlack font-medium>Mô tả kĩ năng: </Text>
                    <Text fs15 textBlack font-light>{description}</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => navi.navigate('Skill', { type: "Update", id: id })}
            >
                <Icon name='edit' size={18} color="#000" />
            </TouchableOpacity>
        </View>
    )
}

const ExperienceSection = ({ exp }) => {
    const {
        id,
        start,
        end,
        company,
        position
    } = exp;
    const navi = useNavigation();
    return (
        <View marginT-5 row spread style={styles.infoContainer}>
            <View>
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
            <TouchableOpacity
                onPress={() => navi.navigate('Experience', { type: "Update", id: id })}
            >
                <Icon name='edit' size={18} color="#000" />
            </TouchableOpacity>
        </View>
    )
}

const EducationSection = ({ edu }) => {
    const {
        id,
        start,
        end,
        school,
        major
    } = edu;
    const navi = useNavigation();
    return (
        <View marginT-5 row spread style={styles.infoContainer}>
            <View>
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
            <TouchableOpacity
                onPress={() => navi.navigate('Education', { type: "Update", id: id })}
            >
                <Icon name='edit' size={18} color="#000" />
            </TouchableOpacity>
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
