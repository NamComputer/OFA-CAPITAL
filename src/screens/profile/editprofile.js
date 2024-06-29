import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { colorsDark } from 'react-native-elements/dist/config';
import { Colors } from '../theme/color';
import { Divider } from 'react-native-elements';
import { USER } from '../data/users';
import { RectangleButton } from '../components/RectangleButton';
import useInAppPurchase from "../hooks/useInAppPurchase"
import { Button } from 'react-native-paper';
import {withIAPContext} from 'react-native-iap';  

const EditProfile = ({navigation}) => {
  const {
    isFullAppPurchased,
    connectionErrorMsg,
    purchaseFullApp,
  } = useInAppPurchase()
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.pop()}>
            <Image style={styles.backArrow} source={require('../../assets/images/chevronleft.png')}/>
        </TouchableOpacity>
        <Text style={styles.textHeader}>Edit Profile</Text>
      </View>
     
      {/* <View style={styles.body}>
        
        <View>
          <Text>{USER[1].user}</Text>
          <Divider style={styles.space} color={Colors.textHeader} width={300} height={2} orientation='vertical' />
          <Text>{USER[1].user}</Text>
          <Divider style={styles.space} color={Colors.textHeader} width={300} height={2} orientation='vertical' />
          <Text>{USER[1].user}</Text>
          <Divider style={styles.space} color={Colors.textHeader} width={300} height={2} orientation='vertical' />
        </View>
      </View> */}
      
      <View >
            {isFullAppPurchased ? (
              <Text style={{ ...styles.msg, color: "green" }}>
                Full app access available!!!
              </Text>
            ) : null}
            <RectangleButton title="Purchase" onpress={purchaseFullApp} />
            {connectionErrorMsg ? (
              <Text style={{ ...styles.msg, color: "red" }}>
                {connectionErrorMsg}
              </Text>
            ) : null}
          </View>
      <View style={styles.footer}>
          <RectangleButton title={'Save'} buttonColor={Colors.textHeader} recWidth={250} recBorderColor={Colors.textHeader} txtColor={Colors.white}/>
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
    flex: .3,
    flexDirection:'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    width:'100%',
    height:'100%'
  },
  body: {
    flex:.5,
    justifyContent:'center',
    flexDirection:'column',
    alignContent: 'center',
    alignItems: 'center',
    marginTop:20
  },
  footer: {
    flex:.8,
    marginTop:100,
    alignContent: 'center',
    alignItems: 'center',
  },
  backArrow:{
    width:50,
    height:50,
  },
  textHeader:{
    fontSize:32,
    color: Colors.textHeader,
    fontWeight:'700',
    marginRight:120
  },
  space:{
    marginBottom:100
  }
});


export default withIAPContext(EditProfile);  