import { Image, AppRegistry,StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { Login } from './screens';
import Register  from './screens/register/register';
import Home from './screens/home/home';
import Wallet from './screens/wallet/wallet';
import Transactions from './screens/transactions/transactions';
import Profile from './screens/profile/profile';
import UploadHistory from './screens/upload/upload';
import { Colors } from './theme/color';
import Scan from './screens/scan/scan';
import EditProfile from './screens/profile/editprofile';
import SelectPhotoScreen from './screens/takephotos/takephotos';
import NewPostScreen from './screens/upload/newpost';
import TakeMultiPhotos from './screens/takephotos/takemultiplephotos';
import { SafeAreaView } from 'react-native-safe-area-context';


const Tab = createMaterialBottomTabNavigator();
const BottomStackScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor={Colors.dark}
    inactiveColor={Colors.notChosen}
    shifting={false}
    barStyle={{ backgroundColor: Colors.bottomBar}}
  >
    <Tab.Screen name="Home" component={Home} options={{ headerShown: false, tabBarIcon:({color}) => (
                                                                            <Image source={require('./assets/images/home.png')} />) }}/>
    <Tab.Screen name="Wallet" component={Wallet} options={{ headerShown: false, tabBarIcon:({color}) => (
                                                                            <Image source={require('./assets/images/Wallet.png')} />) }} />
    <Tab.Screen name="Transactions" component={Transactions} options={{ headerShown: false, tabBarIcon:({color}) => (
                                                                            <Image source={require('./assets/images/arrows.png')} />) }}/>
    <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false, tabBarIcon:({color}) => (
                                                                            <Image source={require('./assets/images/user.png')} />) }}/>
    <Tab.Screen name="Upload" component={UploadHistory} options={{ headerShown: false, tabBarIcon:({color}) => (
                                                                            <Image source={require('./assets/images/Upload.png')} />) }}/>

  </Tab.Navigator>
);

const Stack = createNativeStackNavigator();
const Main = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator 
    //initialRouteName="Main"
    options={{ headerShown: false }}>  
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="Main" component={BottomStackScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
      <Stack.Screen name="Scan" component={Scan} options={{ headerShown: false }}/>
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
      <Stack.Screen name="SelectPhotos" component={SelectPhotoScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NewPost" component={NewPostScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TakeMultiPhotos" component={TakeMultiPhotos} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
)};



export default function App () {
  return (
  <SafeAreaView style={styles.container}>
      <Main />
  </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  container: {
    flex: 1,
  },
  iOSBackdrop: {
    backgroundColor: '#000000',
    opacity: 0.3,
  },
  androidBackdrop: {
    backgroundColor: '#232f34',
    opacity: 0.32,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});



