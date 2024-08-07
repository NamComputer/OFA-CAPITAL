import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from '../entities';
import Physics from '../../helpers/physics';
import { getData } from '../helpers/asyncStorage';
import { getProfile, getTotalBalance } from '../hooks';
import {storeData} from '../helpers/asyncStorage';
import { loadBalance } from '../helpers/loadBalance';
import { useFocusEffect } from '@react-navigation/native';
import { Colors } from '../theme/color';

export default function Home ({navigation})  {

  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)
  const [type, setType] = useState()

//   useFocusEffect(
//   useCallback(async() => {
//     const getlBalance = await getTotalBalance(await(getData('loginToken')))
//     console.log('load balance at home screen',getlBalance.data)
    
//     // return(
//     //   setRunning(false),
//     //   gameEngine.stop()
//     // )
//   }, [])
 

// )

  useEffect(() => {
    setRunning(false)
    const fetchUser = async () => {
      try {
  
        const userInfo = await getProfile(await(getData('loginToken')));
    
        if (userInfo.data !== null) {
          //setAuthProfile(userInfo.data);
          storeData('idUser', userInfo.data.user._id);
          storeData('nameUser',userInfo.data.user.username)
          console.log('Data api/auth/profile',userInfo.data.user._id)
        }
      } catch (e) {
        console.error('Error fetching user info:', e);
      }
    };
    fetchUser()
  },[])
  
  const checkCondition = async(params) =>{
    //loadBalance()
    //let tempBalance =  await(getData('tempBalance'))
    let balance = await getTotalBalance(await(getData('loginToken')))

    console.log('compare',balance.data.actualTotal != balance.data.tempTotal)
    if( balance.data.tempTotal  == 0){


      if(params == 'easy' & JSON.parse(balance.data.actualTotal) >=10){
        setCurrentPoints(0)
        setRunning(true)
        gameEngine.swap(entities())
        setType(params)

      }
      
      else if(params == 'medium' & JSON.parse(balance.data.actualTotal) >100){
        setCurrentPoints(0)
        setRunning(true)
        gameEngine.swap(entities())
        setType(params)
      }
      
      else if(params == 'hard'& JSON.parse(balance.data.actualTotal) >1000){
        setCurrentPoints(0)
        setRunning(true)
        gameEngine.swap(entities())
        setType(params)
      }
      else{
        Alert.alert('Notify','Not enough balance', [
          {
            text: 'TOP-UP now!',
            onPress: () => navigation.navigate('EditProfile'),
          },
        ])
      }
  }
    else{
      Alert.alert('Notify','Your temp & total balance may not verify, Contact Admin! ')
    }
}



  return (
    <View style={{ flex: 1 }}>
      <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20 ,color:Colors.dark}}>{currentPoints}</Text>
      <GameEngine
        ref={(ref) => { setGameEngine(ref) }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          //console.log('Event received:', e.type);
        
          switch (e.type) {
            case 'game_over':        
              //console.log('Game Over event triggered');
              setRunning(false);
              gameEngine.stop();
        
              navigation.navigate('Winner',{
                currentPoints,
                type
              })
       
              break;
            case 'new_point':
              //console.log('New Point event triggered');
              //setHasCheckedResult(true)
              setCurrentPoints(currentPoints + 1);
              break;
            
            // default:
              //console.log('Unknown event type:', e.type);
          }
        }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <StatusBar style="auto" hidden={true} />

      </GameEngine>

      {!running ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'gray' }}>
          <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
            onPress={() => {
              
              checkCondition('easy')
            }}>
          
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
              EASY (min 10$)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
            onPress={() => {
              checkCondition('medium')
            }}>
         
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
              MEDIUM (min 100$)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
            onPress={() => {
              
              checkCondition('hard')
            }}>
           
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
              HARD (min 1000$)
            </Text>
          </TouchableOpacity>
        </View> : null}
    </View>
  );
}



//   return (
//     <View style={styles.container}>
      
//           <View style={styles.header}>
//             <TouchableOpacity onPress={()=> navigation.navigate('Scan')}>      
//             <Image source={require('../../assets/images/camera.png')} />
//             </TouchableOpacity> 
//             <Text style={styles.textHeaderBar}>Verify</Text>
//             <TouchableOpacity onPress={()=>navigation.navigate('SelectPhotos')}>
//               <Image source={require('../../assets/images/add.png')} />
//             </TouchableOpacity>
//             <TouchableOpacity >
//               <Image source={require('../../assets/images/messenger.png')} />
//             </TouchableOpacity>
          
//           </View>
//           <View style={styles.body}>
//             <ScrollView horizontal={false}>
//               {POSTS.map((post,index)=>(
//                   <Post post={post} key={index}/>
//               ))}
//             </ScrollView>
            
//           </View>


//       <View style={styles.footer}>
//         {/* <Image 
//         style={{width: 50, height: 50}}
//         source={{uri:'https://instagram.fsgn4-1.fna.fbcdn.net/v/t51.2885-19/155450158_516554275974183_4042415909005765324_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fsgn4-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=fIB8LhGJopIAX8GUaQN&edm=AIQHJ4wBAAAA&ccb=7-4&oh=00_AT9RlPdXukE4xnhGz5CWr9pltffdQ63I7_kjaHFbHP0Yrw&oe=628C8F4E&_nc_sid=7b02f1'}}/> */}
       
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header:{
//     flex: .2,
//     paddingHorizontal: 20,
//  // flex direction giúp cho nội dung như text, icon cùng 1 line
//     flexDirection: 'row',
//  // alignItem giúp cho nội dung trên line đều được đi qua trung điểm của một đoạn thằng
//     alignItems : "center",
//  // justifyContent giúp tạo khoảng cách giữa các nội dung trong cùng 1 row
//     justifyContent:"space-between"
//   },
//   body: {
//     flex:1,
//     justifyContent:'center',
//     flexDirection:'column',
//     alignContent: 'flex-start',
//     alignItems: 'flex-start',
//   },
//   footer: {
//     flex:.1,
//     alignContent: 'center',
//     alignItems: 'center',
//   },
//   textHeaderBar:{
//     fontSize:20,
//     fontWeight:'bold',
//     marginLeft:120,
//     marginRight:100
//   },


//   buttonContainer:{
//     height:80,
//     width: constants.MAX_WIDTH,
//     backgroundColor:'purple'
//   },
//   playContainer:{
//     height: constants.MAX_HEIGHT - 80,
//     width:constants.MAX_WIDTH,
//     backgroundColor:'blue'
//   }
// });

