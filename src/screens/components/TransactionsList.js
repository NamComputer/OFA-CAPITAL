import { StyleSheet, Text, View, Image, TouchableOpacity,Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';
import { Colors } from '../theme/color';



const Transactions = ({transactions}) => {

  const convertTimeModule = (params) =>{
    let date = new Date(params);
    return(  
      date.toLocaleString('en-US', {
      weekday: 'long', // "Monday"
      year: 'numeric', // "2024"
      month: 'long', // "July"
      day: 'numeric', // "24"
      hour: '2-digit', // "01 PM"
      minute: '2-digit', // "05"
      second: '2-digit', // "07"
      timeZoneName: 'short' // "GMT+1"
    })
  )}
  
  return (

       
      <View style={styles.container}>
          {/* <Image style={styles.imageProfile}  source={{uri:detail.imageURL}}></Image> */}
         
          <View style={styles.subContainer}> 
          <Text>--------------------------------------</Text>
              <Text style={styles.text}>Detail: {transactions.detail}</Text>
              <Text style={styles.text}>Created At: {convertTimeModule(transactions.createdAt)}</Text>
              {!transactions.isVerified?
              <Text style={styles.stamp1}>Verify: {transactions.isVerified.toString()}</Text>
              :
              <Text style={styles.stamp2}>Verify: {transactions.isVerified.toString()}</Text>
              }
               <Text style={styles.text}>Amount: {transactions.amount}$ </Text>
          </View>
     
      </View>
    

  );
}

// const Transactions = ({transactions}) => {
//     return (
//     <View> 
//         <Text>{transactions.overallDate}</Text>
//         {transactions.detailTransactions.map((detail, index) => 
//         <View style={styles.container} key={index}>
//             <Image style={styles.imageProfile}  source={{uri:detail.imageURL}}></Image>
//             <View> 
//                 <Text>{detail.user}</Text>
//                 <Text style={styles.stamp}>{detail.dateStamp} {detail.timeStamp}</Text>
//             </View>
//             <Text style={styles.transactionsValue}>{detail.value}</Text>
//         </View>
//         )}
        
//     </View>
//     );
//   }


const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginTop: 10,
  marginBottom: 10,

  width: Dimensions.get('window').width - 30 , // Sub
},
subContainer: {


  backgroundColor: '#fff',

  // width: Dimensions.get('window').width , // Sub



},
imageProfile:{
    borderRadius:50,
    width: 50, 
    height: 50,
    marginRight:10
  },
  stamp1:{
    fontWeight:'bold',
    color:'red'
  },
  stamp2:{
    fontWeight:'bold',
    color:'green'
  },
  text:{
 // Allows text to shrink if it exceeds the container width
    flexWrap: 'wrap', 
    flexShrink:1,
    color:'black'
  },
})

export default Transactions;