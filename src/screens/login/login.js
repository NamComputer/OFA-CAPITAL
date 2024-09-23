import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Colors} from '../theme/color';
import {widthPercentageToDP as scaleWidth} from 'react-native-responsive-screen';


import React, {useEffect, useState} from 'react';
import {RectangleButton} from '../components/RectangleButton';

import { devURL,productionURL } from '../helpers/fetch';
import {posUserLogin} from '../hooks';
import {getData, storeData} from '../helpers/asyncStorage';

export const Login = ({navigation}) => {

  const checkDataMode = async() =>{
    if(await getData('appMode')==null){
      storeData('appMode',devURL)
    }
  }
  checkDataMode()
  
  const [isChecked, setChecked] = useState(false);
  const [login, loading] = useState(false);
  const [user, setUser] = useState();
  const [password, setPassword] = useState('');
  

  const checkUser = async () => {
    console.log('Check data mode',await getData('appMode')==null)
    try {
    const login = await posUserLogin({
      identity: user,
      password: password,
    });
    if (login.error != null && login.error.status == 401) {
      Alert.alert('Invalid username or password!');
      loading(false);
    }
    if (login.data != null) {
      storeData('loginToken', login.data);
      
      navigation.navigate('Main');
      loading(false);
    } else {
      Alert.alert('please check again!');
      loading(false);
    }
  }
  catch (e) {
    Alert.alert('please check again!',e.message);
    loading(false);
    console.error('Error fetching balance:', e);
  }
    
  };

  const changeURL = async() => {
    Alert.alert('Changing the server!', 'Yours current url is '+ await getData('appMode')+' Do you want to change to',[
      
      {
        text: 'Confirm',
        onPress: async() => {
          if(await getData('appMode')==productionURL){
     
            storeData('appMode',productionURL)
          }
          else{
            storeData('appMode',devURL)
          }       
        },
        
      },
      {
        text: 'Cancel',   

      },
    
    ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This change was dismissed.',
          ),
      },
    
    )
 
  }

  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Alert.alert('You pressed')}>
          <Text style={styles.hyperLink}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.notHyperLink}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.subBody}>
          <Image source={require('../../assets/images/mail.png')} />
          <TextInput
            maxLength={30}
            style={styles.input}
            placeholder={'Email Adress'}
            placeholderTextColor={Colors.hint}
            autoCapitalize="none"
            onChangeText={user => setUser(user)}
            value={user}
          />
        </View>
        <View style={styles.subBody}>
          <Image source={require('../../assets/images/lock.png')} />
          <TextInput
            maxLength={30}
            style={styles.input}
            placeholder={'Password'}
            placeholderTextColor={Colors.hint}
            autoCapitalize="none"
            onChangeText={password => setPassword(password)}
            value={password}
            secureTextEntry={true}
            password={true}
          />
        </View>
        <View style={styles.passWordSection}>
          <View style={styles.chkboxNvalue}>
            <TextInput
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? '#4630EB' : undefined}
            />
            <Text style={styles.textOfCheckbox}>Remember Me</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('You Pressed'), console.log('pressed');
            }}>
            <Text style={styles.secondTextofCheckbox}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <RectangleButton
          onpress={async () => {loading(true),checkUser()}}
          // onpress={() => {
          //   navigation.navigate('Main');
          // }}
          buttonColor={Colors.button}
          title={login ? 'Logging...' : 'Login'}
          recWidth={300}
          recBorderColor={Colors.button}
        />
        <TouchableOpacity onLongPress={changeURL}>
          <Text style={styles.hyperLink}>Powered by OFA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 0.2,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  body: {
    flex: 0.5,
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  subBody: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  passWordSection: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    marginLeft: scaleWidth(11),
  },
  footer: {
    flex: 0.5,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',

  },
  input: {
    height: 50,
    width: scaleWidth(80),
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: Colors.hint,
    alignSelf: 'center',
    fontSize: 20,
    color: Colors.dark,
  },
  chkboxNvalue: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    right: 35,
  },
  textOfCheckbox: {
    margin: 10,
    color: Colors.textOfCheckbox,
    fontWeight: 'bold',
  },
  secondTextofCheckbox: {
    color: Colors.secondTextOfCheckbox,
    fontWeight: 'bold',
  },
  hyperLink: {
    color: Colors.button,
    // fontFamily: 'Arial',
    margin: 10,
    fontSize: 20,
  },
  notHyperLink: {
    color: Colors.notChosen,
    // fontFamily: 'Arial',
    margin: 10,
    fontSize: 20,
  },
});
