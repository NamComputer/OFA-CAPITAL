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

import React, {useState} from 'react';
import {RectangleButton} from '../components/RectangleButton';
import Register from '../register/register';

import {getUser, posUserLogin} from '../hooks';
import {storeData} from '../helpers/asyncStorage';

export function Login({navigation}) {
  const checkUser = async () => {
    const login = await posUserLogin({
      identity: user,
      password: password,
    });
    if (login.error != null && login.error.status == 401) {
      Alert.alert('Invalid username or password!');
      loading(false);
    }
    if (login.data != null) {
      storeData('login', login.data);
      navigation.navigate('Main');
      loading(false);
    } else {
      Alert.alert('please check again!');
      loading(false);
    }
    console.log('Login result', login);
  };

  const [isChecked, setChecked] = useState(false);
  const [login, loading] = useState(false);
  const [user, setUser] = useState();
  const [password, setPassword] = useState('');

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
          // title={'Login'}
          // onpress={async () => {loading(true),checkUser()}}
          onpress={() => {
            navigation.navigate('Main');
          }}
          buttonColor={Colors.button}
          title={login ? 'Logging...' : 'Login'}
          recWidth={300}
          recBorderColor={Colors.button}
        />
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
