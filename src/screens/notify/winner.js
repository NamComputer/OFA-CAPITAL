import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { posPoint } from '../helpers/loadBalance';
import { getData } from '../helpers/asyncStorage';
import { getTotalBalance } from '../hooks';
import { Colors } from '../../theme/color';



const WinnerNotification = ({ navigation,route }) => {

    const { currentPoints, type} = route.params

    const [balance, setBalance] = useState(null);
  
    useEffect(() => {
      const checkPoints = async () => {

        if (currentPoints >= 10 && type === 'easy') {
      
          posPoint(currentPoints * 2);
        } else if (currentPoints >= 100 && type === 'medium') {
          posPoint(currentPoints * 2);
        } else if (currentPoints >= 1000 && type === 'hard') {
          posPoint(currentPoints * 2);
        } else {
          const balanceValue = await getTotalBalance(await(getData('loginToken')));
          //setBalance(balanceValue); // Set the balance in state
          console.log('Point after lose:', balanceValue);
          posPoint(-balanceValue.data.actualTotal); // Uncomment if you need to post the balance
          setBalance(-balanceValue.data.actualTotal)
        }
      };
  
      checkPoints();
    }, [currentPoints, type]);
   


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Result!</Text>
      <Text style={styles.message}>🎉 Points! 🎉</Text>
      <Text style={styles.message}>{balance}</Text>
      {balance?
      <Button 
        title="Back to Home"
        onPress={() => {
          navigation.navigate('Main'),
          setBalance(null)
        }}
      />
      :<Text>Please waiting for load result...</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
   
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color:Colors.dark
  },
  message: {
    fontSize: 24,
    marginBottom: 40,
    color:Colors.dark
  },
});

export default WinnerNotification;
