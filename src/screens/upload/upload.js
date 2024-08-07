import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import { Colors } from '../../theme/color';
import { format } from 'date-fns';

const DATA = [
  {
    status: "Succeeded",
    timeStamp : "March 28, 2022",
    id:1
    
  },
  {
    status: "Failed",
    timeStamp : "March 28, 2022",
    id:2
  },
  {
    status: "Succeeded",
    timeStamp : "March 28, 2025",
    id:3
  },
];
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

export default function UploadHistory() {
  return (
 
        <View style={styles.container}>
          <Text style={styles.text}>Feature Coming Soon!</Text>
          <Text style={styles.subTitle}>Stay tuned for updates.</Text>
            
        </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "700",
    color: Colors.dark,
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center"
  },
  subTitle: {
    fontSize: 15,
    color: Colors.dark,
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center"
  },
  btn: {
    marginTop: 100,
    justifyContent: "center",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems:'center'
  },
  button: {
    alignSelf: "center",
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: "white",
    padding: 10,
    margin:280,
    width:"80%",
    height:"5%",
    borderRadius:10
  },
  text:{
    color: Colors.dark,
  },
  item: {
    borderBottomWidth:5,
    borderColor: "#24cbc2",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 20,
    justifyContent:"space-between",
    flexDirection:'row',

  },
  title: {
    color:Colors.dark,
    fontSize: 15,
    margin:10
  },
  noHistory:{
    flex:1,
    fontSize: 40,
    fontWeight: "700",
    color: Colors.textHeader,
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
  }
});
