import { StyleSheet, Text, View, Image, TouchableOpacity,Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';
import { Colors } from '../theme/color';




const Transactions = ({transactions}) => {
    return (
    <View> 
        <Text>{transactions.overallDate}</Text>
        {transactions.detailTransactions.map((detail, index) => 
        <View style={styles.container} key={index}>
            <Image style={styles.imageProfile}  source={{uri:detail.imageURL}}></Image>
            <View> 
                <Text>{detail.user}</Text>
                <Text style={styles.stamp}>{detail.dateStamp} {detail.timeStamp}</Text>
            </View>
            <Text style={styles.transactionsValue}>{detail.value}</Text>
        </View>
        )}
        
    </View>
    );
  }


const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop:10,
    marginBottom:10
},
imageProfile:{
    borderRadius:50,
    width: 50, 
    height: 50,
    marginRight:10
  },
  stamp:{
    fontWeight:'200'
  },
  transactionsValue:{
    marginLeft:100,
    fontSize:16
  },
})

export default Transactions;