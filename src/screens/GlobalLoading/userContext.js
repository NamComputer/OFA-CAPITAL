import React, { createContext, useState, useEffect } from 'react';
import { getBalance } from '../hooks';
import { getData,storeData } from '../helpers/asyncStorage';

// Create the context
const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
  //const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState() 



//   useEffect(() => {
//     // You can check and load user data from AsyncStorage here if needed
//     const loadUserData = async () => {
//       try {
//         //const userData = await AsyncStorage.getItem('user');
//         if (userData) {
//           setUser(JSON.parse(userData));
//         }
//       } catch (e) {
//         console.error('Failed to load user data', e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUserData();
//   }, []);

//   const signIn = async (userData) => {
//     // Save user data to AsyncStorage
//     //await AsyncStorage.setItem('user', JSON.stringify(userData));
//     setUser(userData);
//   };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
  
        const userBalance = await getBalance(await(getData('loginToken')));
        //console.log('Data api/transaction',userBalance.data.length)
    
        if (userBalance.data !== null  ) {
          //setAuthProfile(userInfo.data);
          //storeData('', login.data);
    
          let temp = 0
          for (let i = 0;i<userBalance.data.length;i++){
            if ( userBalance.data[i].isVerified == true){
            temp += userBalance.data[i].amount
            }
          }
          setBalance(temp)
          storeData('balance',JSON.stringify(temp))
          
          
          console.log('result',temp)
        }
      } catch (e) {
        console.error('Error fetching balance:', e);
      }
      finally {
                setLoading(false);
              }
    };
    fetchBalance()
  },[])


  return (
    <UserContext.Provider value={{ balance, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
