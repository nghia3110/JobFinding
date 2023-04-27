import {
    AppliedJobs,
    Education,
    Experience,
    HomeCv,
    UserHomeScreen,
    JobDetail,
    ListCV,
    AccountManager,
    SearchFilter,
    SearchResult,
    Skill,
    UpdateAccountInfo,
    ViewProfile,
    UpdateProfile,
    ApplyJob,
    JobList,
    ViewCV,
    CompanyHomeScreen,
    CompanyProfileManager,
    Jobs,
    JobManager,
    CreateJob,
    UpdateJob,
    ApproveJob,
    ApplicationDetail,
    ViewUserProfile
} from 'screens/main';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import { navigationRef } from './utils';
import { useAuth } from 'hooks';
import SplashScreen from 'react-native-splash-screen';
import { LoginScreen, RegisterUser, RegisterCompany, ForgotPassword, SelectRoleScreen } from 'screens/auth';
import { CompanyList } from 'screens/main/company';
import { CompanyDetail } from 'screens/main/company/CompanyDetail';
import { CompanyJobs } from 'screens/main/company/CompanyJobs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// @refresh reset
export const ApplicationNavigator = () => {
    const { isLogged, user, company } = useAuth();
    console.log(isLogged);

    useEffect(() => {
        SplashScreen.hide();
    });

    return (
        <NavigationContainer ref={navigationRef}>
            <StatusBar barStyle="light-content" />
            <Stack.Navigator
                initialRouteName={user ? 'UserHome' : 'CompanyHome'}
                screenOptions={{ headerShown: false }}
            >
                {isLogged ? (
                    <React.Fragment>
                        {user && <>
                            <Stack.Screen
                                name="UserHome"
                                component={UserTabBarNavigation}
                            />
                            <Stack.Screen
                                name="SearchResult"
                                component={SearchResult}
                            />
                            <Stack.Screen
                                name="SearchFilter"
                                component={SearchFilter}
                            />
                            <Stack.Screen name="JobDetail" component={JobDetail} />
                            <Stack.Screen
                                name="JobList"
                                component={JobList}
                            />
                            <Stack.Screen
                                name="AppliedJobs"
                                component={AppliedJobs}
                            />
                            <Stack.Screen
                                name="UpdateAccountInfo"
                                component={UpdateAccountInfo}
                            />
                            <Stack.Screen
                                name="Education"
                                component={Education}
                            />
                            <Stack.Screen name="Skill" component={Skill} />

                            <Stack.Screen
                                name="Experience"
                                component={Experience}
                            />
                            <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
                            <Stack.Screen name="ListCv" component={ListCV} />


                            <Stack.Screen name="ApplyJob" component={ApplyJob} />
                            <Stack.Screen name="ApplicationDetail" component={ApplicationDetail} />
                            <Stack.Screen
                                name="CompanyList"
                                component={CompanyList}
                            />
                            <Stack.Screen
                                name="CompanyDetail"
                                component={CompanyDetail}
                            />
                            <Stack.Screen
                                name="CompanyJob"
                                component={CompanyJobs}
                            />
                        </>}
                        {company && <>
                            <Stack.Screen
                                name="CompanyHome"
                                component={CompanyTabBarNavigation}
                            />
                            <Stack.Screen name="Jobs" component={Jobs}/>
                            <Stack.Screen
                                name="JobManager"
                                component={JobManager}
                            />
                            <Stack.Screen
                                name="CreateJob"
                                component={CreateJob}
                            />
                            <Stack.Screen
                                name="UpdateJob"
                                component={UpdateJob}
                            />
                            <Stack.Screen
                                name="ApproveJob"
                                component={ApproveJob}
                            />
                            <Stack.Screen
                                name="ViewUserProfile"
                                component={ViewUserProfile} 
                            />
                        </>}
                        <Stack.Screen name="ViewCV" component={ViewCV} />
                        <Stack.Screen name="ViewProfile" component={ViewProfile} />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={SelectRoleScreen} />
                        <Stack.Screen
                            name="RegisterUser"
                            component={RegisterUser}
                        />
                        <Stack.Screen
                            name="RegisterCompany"
                            component={RegisterCompany}
                        />
                        <Stack.Screen
                            name="ForgotPassword"
                            component={ForgotPassword}
                        />
                    </React.Fragment>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const UserTabBarNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName={'UserHomeScreen'}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#A4DCC6',

            }}
        >
            <Tab.Screen
                name="UserHomeScreen"
                component={UserHomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name={'home-sharp'}
                            size={size}
                            color={color}
                        />
                    ),
                    tabBarLabel: 'Trang chủ'
                }}
            />
            <Tab.Screen
                name="CV & Hồ sơ"
                component={HomeCv}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list-sharp" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountManager}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="person-sharp"
                            color={color}
                            size={size}
                        />
                    ),
                    tabBarLabel: 'Tài khoản',
                    tabBarLabelPosition: 'below-icon'
                }}
            />
        </Tab.Navigator>
    );
};

const CompanyTabBarNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName={'CompanyHomeScreen'}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#A4DCC6',

            }}
        >
            <Tab.Screen
                name="CompanyHomeScreen"
                component={CompanyHomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name={'home-sharp'}
                            size={size}
                            color={color}
                        />
                    ),
                    tabBarLabel: 'Trang chủ'
                }}
            />
            <Tab.Screen
                name="CompanyProfile"
                component={CompanyProfileManager}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="person-sharp"
                            color={color}
                            size={size}
                        />
                    ),
                    tabBarLabel: 'Tài khoản',
                    tabBarLabelPosition: 'below-icon'
                }}
            />
        </Tab.Navigator>
    );
};