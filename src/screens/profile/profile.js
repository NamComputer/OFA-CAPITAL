import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { RectangleButton } from '../components/RectangleButton';
import { USER } from '../data/users';
import { Colors } from '../theme/color';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import {getUser, posUser} from '../hooks';
import { getData } from '../helpers/asyncStorage';
import { useEffect, useState } from 'react';

export default function Profile({navigation}) {
  const [profile,setProfile] = useState()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await getUser();
        if (userInfo.data !== null) {
          setProfile(userInfo.data.username);
        }
      } catch (e) {
        console.error('Error fetching user info:', e);
      }
    };

    //fetchUser();

  },[])
  return (
    
    <View style={styles.container}>   
      <View style={styles.header}>
        <View/>
          <View style={styles.headerChild}>  
              <Text style={styles.headerTitle}>My Profile</Text>          
              <Image style={styles.imageProfile} source={{uri:USER[1].image}} /> 
              <Text style={styles.subHeaderTitle}>Have a nice day! Mr/Mrs {profile}</Text>
          </View>
          <TouchableOpacity onPress={()=> Alert.alert('You pressed edit') }>
              <Image style={styles.imageIcon} source={require('../../assets/images/EditIcon.png')}/>
          </TouchableOpacity>
      </View>
      <View style={styles.body}>
          <RectangleButton title={'👤　My Purchase'} onpress={()=>navigation.navigate('EditProfile')} buttonColor={Colors.bottomBar} txtColor={Colors.dark} recBorderColor={Colors.bottomBar} recWidth={300} />
          <RectangleButton title={'💼　CV Management'} onpress={()=>Alert.alert('You pressed!')} buttonColor={Colors.bottomBar} recBorderColor={Colors.bottomBar} recWidth={300} />
          <RectangleButton title={'⚙️　Settings'} onpress={()=>Alert.alert('You pressed!')} buttonColor={Colors.bottomBar} recBorderColor={Colors.bottomBar} recWidth={300} />
      </View>
      <View style={styles.footer}>
          <RectangleButton title={'Log Out!'} onpress={()=>navigation.pop()} buttonColor={Colors.red} recBorderColor={Colors.bottomBar} recWidth={300} />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: .5,
    flexDirection:'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.bottomBar,
    width:'100%',
    height:'100%'
  },
  body: {
    flex:.3,
    justifyContent:'center',
    flexDirection:'column',
    alignContent: 'center',
    alignItems: 'center',
    marginTop:20
  },
  footer: {
    flex:.2,
    marginTop:100,
    alignContent: 'center',
    alignItems: 'center',
  },
  imageProfile:{
    borderRadius:50,
    width: 140, 
    height: 140,
  },
  headerChild:{
    flexDirection:'column',
    alignContent: 'center',
    alignItems:'center',
    alignSelf:'center',
  },
  headerTitle:{
    color:Colors.dark,
    fontSize:20,
    fontWeight:'500',
    marginBottom:30
  },
  subHeaderTitle:{
    color:Colors.dark,
    fontSize:16,
    fontWeight:'300',
    alignItems:'center',
    alignSelf:'center',
  },
  headerComponent:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:30
  },
  imageIcon:{
    marginBottom:200,
  },

});
