import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { colorsDark } from 'react-native-elements/dist/config';
import { Colors } from '../theme/color';
import { Divider } from 'react-native-elements';
import { USER } from '../data/users';
import { RectangleButton } from '../components/RectangleButton';
import useInAppPurchase from "../hooks/useInAppPurchase"
import { Button } from 'react-native-paper';
import {withIAPContext} from 'react-native-iap';  
import { errorLog } from '../../helpers/logs';
import React, { useEffect, useState } from 'react';
import * as useIAP from 'react-native-iap'
import {Row} from'../components/Row'
import ProductItem from '../components/productItem';
import {
  getProducts, //For fetching available products
  requestPurchase, //For initiating in-app purchases
  purchaseUpdatedListener, //For listening to purchase events
  purchaseErrorListener, //For listening to purchase errors
  finishTransaction  //For acknowledging a purchase
} from "react-native-iap";



const EditProfile = ({navigation}) => {

  
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const itemSKUs = Platform.select({
    android: ["1stpayment", "2ndpayment","200usdofa"],
    ios: ["1stpayment_ios", "2ndpayment_ios"]
  });







  const handlePurchase = async (productId) => {
    setLoading(true)
    try {
        await requestPurchase({ skus: [productId] });
    } catch (error) {
        console.lof('error',error)
        Alert.alert('Error occurred while making purchase')
    }
    finally {
        setLoading(false);
    }
}

useEffect(() => {

  const purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase) => {
          const receipt = purchase.transactionReceipt;

          if (receipt) {
              try {
                  await finishTransaction({ purchase, isConsumable: false });
              } catch (error) {
                  console.error("An error occurred while completing transaction", error);
              }
              notifySuccessfulPurchase();
          }
      });

  const purchaseErrorSubscription = purchaseErrorListener((error) =>
      console.error('Purchase error', error.message));

  const fetchProducts = async () => {
      try {
          const result = await getProducts({ skus: itemSKUs });
          setProducts(result);
          setLoading(false);
      }
      catch (error) {
          Alert.alert('Error fetching products')
      }
  }


  fetchProducts();



  return () => {
      purchaseUpdateSubscription.remove();
      purchaseErrorSubscription.remove();
  }


}, []);

const notifySuccessfulPurchase = () => {
  Alert.alert("Success", "Purchase successful", [
      {
          text: 'Home',
          onPress: () => navigation.navigate('Home')
      }
  ])
}


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>{setProducts([]),navigation.pop()}}>
            <Image style={styles.backArrow} source={require('../../assets/images/chevronleft.png')}/>
        </TouchableOpacity>
        <Text style={styles.textHeader}>Product List</Text>
      </View>
     
      <View style={styles.body}>
          {
            !isLoading ?
                <>
                    {/* <View >
                     
                        <View style={styles.heading}>
                            <Text style={styles.text}>Unlock all Recipes</Text>
                            <Text style={styles.subText}>Get unlimited access to 1000+ recipes</Text>
                        </View>
                    </View> */}
                    {products.map((product, index) => (
                        <ProductItem
                            key={index}
                            title={product.title}
                            onPress={() => handlePurchase(product.productId)} />
                    ))}
                </> :<></>
          }
      </View>           

      <View style={styles.footer}>

          </View>    
    </View>
    
    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',

  },
  header: {
    flex: .1,
    flexDirection:'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    width:'100%',
    height:'100%',

  },
  body: {
    flex:.9,
    justifyContent:'center',
    flexDirection:'column',
    alignContent: 'center',
    alignItems: 'center',


  },
  footer: {
    flex:.1,

    alignContent: 'center',
    alignItems: 'center',
  },
  backArrow:{
    width:50,
    height:50,
  },
  textHeader:{
    fontSize:32,
    color: Colors.textHeader,
    fontWeight:'700',
    marginRight:120
  },

  text: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
  },
  subText: {
    fontSize: 18,
    color: 'black',
    overflow: 'hidden'
  },
});


export default withIAPContext(EditProfile);  