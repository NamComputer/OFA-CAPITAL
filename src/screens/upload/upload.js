import React,{useCallback} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableWithoutFeedback, Keyboard, FlatList,Linking, Button, Alert, Image } from 'react-native';
import { Colors } from '../../theme/color';
import { format } from 'date-fns';
import { RectangleButton } from '../components/RectangleButton';

// const DATA = [
//   {
//     status: "Succeeded",
//     timeStamp : "March 28, 2022",
//     id:1
    
//   },
//   {
//     status: "Failed",
//     timeStamp : "March 28, 2022",
//     id:2
//   },
//   {
//     status: "Succeeded",
//     timeStamp : "March 28, 2025",
//     id:3
//   },
// ];
//Old history screen
// export default function UploadHistory() {
//   return (
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.container}>
    
//           {/* const { goToScreen, goToBack } = useNavigation(); */}
//           {/* console.log(getData) */}
//             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                 <View style={styles.container}>
//                     <Text style={styles.text}>
//                         {DATA.length < 1?<Text style={styles.noHistory}>You Have No Story</Text>:
//                         <View>
//                         <Text style={styles.headerTitle}>History</Text>
//                         <Text style={styles.subTitle}>{format(new Date(),'MMM do, yyyy')}</Text>          
//                         <FlatList
//                         data={DATA}
//                         renderItem={({item}) =>(
//                           <View style={styles.item}>
//                             <Text style={styles.title}>{item.status}</Text>
//                             <Text style={styles.title}>{item.timeStamp}</Text>
//                           </View>
//                         )}
//                         keyExtractor={(item) => item.id}
//                         // extraData={selectedId}
//                         />
//                         </View>
//                         }
//                     </Text>
      
//               </View>
//             </TouchableWithoutFeedback>
//         </View>
      
//       </TouchableWithoutFeedback>
//   );
// }

const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (!supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

   
  //<Button color={'#FFDD00'}  title={children} onPress={handlePress} />;
  return <RectangleButton title={children} onpress={handlePress} buttonColor={'#FFDD00'} txtColor={Colors.dark} recBorderColor={'#FFDD00'} recWidth={300}/>
};

export default function UploadHistory() {
  return (
 
        <View style={styles.container}>
        
       
 
          <OpenURLButton url={'https://buymeacoffee.com/ofacapitalinc'}>❤️　Click here to support</OpenURLButton>
        </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


  supportButton: {

    justifyContent: "center",
    alignSelf: "center",
    borderRadius:100,
    color:'yellow'
  },



});
