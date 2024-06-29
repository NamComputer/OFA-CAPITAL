import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Colors } from '../../theme/color';
import { Divider } from 'react-native-elements';
import { TRANSACTIONS } from '../data/transactions';
import Transactions from '../components/TransactionsList';

export default function TransactionsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions History</Text>
        <Divider style={styles.space} width={1000} height={2} orientation='vertical' />
      </View>  

      <View style={styles.body}>
      {TRANSACTIONS.length < 1 ? 
        <View style={styles.containerNoTransactions}>
          <Image source={require('../../assets/images/empty_illustration.png')}/>
          <Text style={styles.noTransactions}>There's no transactions till now! </Text>
        </View>  
          :
        <ScrollView>
          {TRANSACTIONS.map((transactions,index)=>(
              <Transactions transactions={transactions} key={index}/>
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
