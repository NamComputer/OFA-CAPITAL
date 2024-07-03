import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert , TextInput} from 'react-native';
import { Colors } from '../../theme/color';
import { widthPercentageToDP as scaleWidth, heightPercentageToDP as scaleHeight } from 'react-native-responsive-screen';
import { RectangleButton } from '../components/RectangleButton'; 
import { registerUser } from '../hooks';


const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [emailError, setEmailError] = useState(false);
  // const [passwordError, setPasswordError] = useState(false);
  // const [confirmPasswordError, setConfirmPasswordError] = useState(false);



  // const handleSubmit = () => {
  //   let valid = true;
  //   setEmailError(false);
  //   setPasswordError(false);
  //   setConfirmPasswordError(false);

  //   if (email.length === 0) {
  //     setEmailError(true);
  //     valid = false;
  //   }
  //   if (password.length === 0) {
  //     setPasswordError(true);
  //     valid = false;
  //   }
  //   if (confirmPassword.length === 0) {
  //     setConfirmPasswordError(true);
  //     valid = false;
  //   }
  //   if (password !== confirmPassword) {
  //     setPasswordError(true);
  //     setConfirmPasswordError(true);
  //     valid = false;
  //   }

  //   if (valid) {
  //     // Perform registration logic here
  //     navigation.navigate('Login');
  //   }
  // };

  const handleSubmit = async () => {

    if(password == confirmPassword){
    const reg = await registerUser({
      username: email,
      password: password
      
    });
    if (reg.success == true)
      {
        navigation.navigate('Main')
      }
      else{
        Alert.alert('Something wrong, please contact admin')
      }
  }
    else{
      Alert.alert('Something wrong, please contact admin')
    }
  
  }

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.notHyperLink}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('You pressed')}>
          <Text style={styles.hyperLink}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        {/* <View style={styles.subBody}>
          <Image source={require('../../assets/images/Name.png')} />
    
            <TextInput
              maxLength={30}
              style={styles.input}
              placeholder={'Your Name'}
              placeholderTextColor={Colors.hint}
              autoCapitalize="none"
            />
   
        </View> */}
        <View style={styles.subBody}>
          <Image source={require('../../assets/images/mail.png')} />

            <TextInput
              maxLength={30}
              style={styles.input}
              placeholder={'Email Address'}
              placeholderTextColor={Colors.hint}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setEmail}
              value={email}
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
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
            />
          
        </View>
        <View style={styles.subBody}>
          <Image source={require('../../assets/images/lock.png')} />
          
            <TextInput
              maxLength={30}
              style={styles.input}
              placeholder={'ReEnter Password'}
              placeholderTextColor={Colors.hint}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
      
        </View>
        <View style={styles.passWordSection}>
          <Text style={styles.textOfCheckbox}>By joining in you are agreeing our</Text>
          <TouchableOpacity onPress={() => Alert.alert('You Pressed')}>
            <Text style={styles.secondTextofCheckbox}>Term and privacy policy</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <RectangleButton
          onPress={handleSubmit}
          buttonColor={Colors.button}
          title="Register"
          onpress={()=>handleSubmit()}
          recWidth={300}
          recBorderColor={Colors.button}
        />
      </View>
    </View>

  );
};

export default  Register;

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
    marginTop:scaleHeight(10),
    flex: .5,
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
    marginLeft: 30,
  },
  passWordSection: {
    marginTop: 20,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
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
  },
  chkboxNvalue: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    right: 35,
  },
  textOfCheckbox: {
    color: Colors.textOfCheckbox,
    fontWeight: 'bold',
  },
  secondTextofCheckbox: {
    color: Colors.secondTextOfCheckbox,
    fontWeight: 'bold',
  },
  hyperLink: {
    color: Colors.button,
    fontFamily: 'Arial',
    margin: 10,
    fontSize: 20,
  },
  notHyperLink: {
    color: Colors.notChosen,
    fontFamily: 'Arial',
    margin: 10,
    fontSize: 20,
  },
});