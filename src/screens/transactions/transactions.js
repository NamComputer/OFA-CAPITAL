import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Colors } from '../../theme/color';
import { Divider } from 'react-native-elements';
import Transactions from '../components/TransactionsList';
import { useState, useEffect,useCallback } from 'react';
import { getBalance } from '../hooks';
import { getData } from '../helpers/asyncStorage';
import { useFocusEffect } from '@react-navigation/native';


export default function TransactionsScreen() {
  const [userTrans,setUserTrans] = useState({"data":[]})

  useFocusEffect(
    useCallback(() => {
      const fetchBalance = async () => {
        try {
    
          const userBalance = await getBalance(await(getData('loginToken')));
          //console.log('Data api/transaction',userBalance.data.length)
      
          if (userBalance.data !== null  ) {
            //setAuthProfile(userInfo.data);
            //storeData('', login.data);
            setUserTrans(userBalance)
            //console.log('Data api/transaction',userBalance.data[1],'result',temp)
          }
        } catch (e) {
          console.error('Error fetching balance:', e);
        }
      };
         
      fetchBalance()
      return () => {
        setUserTrans({"data":[]})
        //console.log('Home Screen is unfocused');
        // Cleanup actions if necessary
      };
    }, [])
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions History</Text>
        <Divider style={styles.space} width={1000} height={2} orientation='vertical' />
      </View>  

      <View style={styles.body}>
      {userTrans.data.length < 1 ? 
        <View style={styles.containerNoTransactions}>
          {/* <Image source={require('../../assets/images/empty_illustration.png')}/> */}
          <Text style={styles.noTransactions}>There's no transactions till now! </Text>
        </View>  
          :
        <ScrollView>
          {userTrans.data
          .filter(transaction => transaction.createdAt)
          .map((transactions)=>(
              <Transactions transactions={transactions} key={userTrans.data._id}/>
          ))}
        </ScrollView>}
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
    flex: .1,
    flexDirection:'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    height:'100%'
  },
  body: {
    flex:.8,
    justifyContent:'center',
    flexDirection:'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  headerTitle:{
    color:Colors.dark,
    fontSize:20,
    fontWeight:'500',
  },
  space:{
    marginTop:10
  },
  noTransactions:{
    color:Colors.dark,
    fontSize:20,
  },
  containerNoTransactions:{
    marginTop:60,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  }
});
