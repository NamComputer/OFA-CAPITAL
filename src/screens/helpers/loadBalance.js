import { getData, storeData } from '../helpers/asyncStorage';
import { getBalance,posPurchase } from '../hooks';


export const loadBalance = async () => {
      try {
  
        const userBalance = await getBalance(await(getData('loginToken')));
        //console.log('userBalance',userBalance)
    
        if (userBalance.data !== null  ) {

      
          let temp = 0
          for (let i = 0;i<userBalance.data.length;i++){
           
            temp += userBalance.data[i].amount
            
          }
          
          storeData('tempBalance',JSON.stringify(temp))
          
        }
      } catch (e) {
        console.error('Error fetching balance:', e);
      }
      
    };
  
//convert point to usd to play 
export const posPoint  = async (params) => {
  try {
    const apiTransPOS = await posPurchase({
      "amount": params,
      "currency": "usd",
      "type": "in-app-purchase",
      "typeId": "123",
      "user": await(getData('idUser')),
      "detail": "Point plus/Minus"
    });
    console.log('--RESULT OF CALCULATE POINT-----',apiTransPOS)
  }
  catch(e){
    console.error('Error pushing points:', e);
  }

}