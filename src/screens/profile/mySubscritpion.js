import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
  } from 'react-native';
  import {Colors} from '../theme/color';
  import React, {useEffect, useState} from 'react';
  import ProductItem from '../components/productItem';
  import {
    purchaseUpdatedListener, //For listening to purchase events
    purchaseErrorListener, //For listening to purchase errors
    finishTransaction, //For acknowledging a purchase
    getSubscriptions,
    requestSubscription
  } from 'react-native-iap';
  import { posPurchase } from '../hooks';
  import { getData } from '../helpers/asyncStorage';
  
  const MySubscription = ({navigation}) => {
 
    const [availableItems, setAvailableItems] = useState([]);
    const [isLoading, setLoading] = useState(true);


    const subItemSKUs = Platform.select({
      android: ['05'],
  
    });
  
  
    const handleSubscription = async (product) => {
    setLoading(true);
      try {
        const sku = product.productId
        const offerToken = Platform.OS === 'android'
        ? product.subscriptionOfferDetails[0]?.offerToken || null
        : null
        await requestSubscription({
                sku,
                ...(offerToken && {
                    subscriptionOffers: [{sku, offerToken}],
                  })
            });
      } catch (err) {
        console.warn(err.code, err.message);
        console.log('error', err);
        Alert.alert('Error occurred while making purchase');
      }
      finally {
        setLoading(false);
      }
    };
    

    
  
  
    useEffect(() => {
      const purchaseUpdateSubscription = purchaseUpdatedListener(
        async purchase => {
            //console.log('purchase receive',purchase);
          const receipt =  JSON.parse(purchase.transactionReceipt);          
        //   console.log('receipt',receipt == true )
          if (receipt) {
            try {
              const result = await finishTransaction(
               {purchase,
                isConsumable: false,
            }
            )
       
              let id =  await(getData('idUser'))
              const apiTransPOS = await posPurchase({
                "amount": receipt.productId*receipt.quantity,
                "currency": "usd",
                "type": "in-app-subscription",
                "typeId": "1",
                "user": id,
                "detail": receipt.orderId
              });
              console.log('result',result, 'receipt',receipt.orderId,'API Result',apiTransPOS);
           ;    
            } catch (error) {
              console.error(
                'An error occurred while completing transaction',
                error,
              );
            }           
            notifySuccessfulPurchase();  
          }
        },
      );
  
      const purchaseErrorSubscription = purchaseErrorListener(error =>
        console.error('Purchase error:', error.message),
      );
  

  
      const initSubscrip = async () => {
        try {
          const items = (await getSubscriptions({skus:subItemSKUs})).map(item =>({
            ...item,
            // purchased: investmentProductIds.indexOf(item.productId) !== -1,
          }));
          console.log('SubScription',items)
          setAvailableItems(items);
          setLoading(false);
        } catch (err) {
          console.log('error connecting to store or fetching subscriptions', err);
        }
      }
      
      initSubscrip();

  
      return () => {
        purchaseUpdateSubscription.remove();
        purchaseErrorSubscription.remove();
      };
    }, []);
  
    const notifySuccessfulPurchase = () => {
      Alert.alert('Success', 'Purchase successful');
    };


    //console.log('availableItems',availableItems)
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
                setAvailableItems([]), navigation.pop();
            }}>
            <Image
              style={styles.backArrow}
              source={require('../../assets/images/chevronleft.png')}
            />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Subscription List</Text>
        </View>
  
      
  
        <View style={styles.body}>

            {!isLoading ? (
                <>
          
                {availableItems.map((product, index) => (
                    <ProductItem
                    key={index}
                    title={product.name}
                 
                    onPress={() => handleSubscription(product)}
                    />
                ))}
                </>
            ) : (
                <></>
            )}
            </View>
            <View style={styles.footer}></View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      flex: 0.1,
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
    },
    body: {
      flex: 0.9,
      justifyContent: 'center',
      flexDirection: 'column',
      alignContent: 'center',
      alignItems: 'center',

    },
    footer: {
      flex: 0.5,
  
      alignContent: 'center',
      alignItems: 'center',
    },
    backArrow: {
      width: 50,
      height: 50,
    },
    textHeader: {
      fontSize: 32,
      color: Colors.textHeader,
      fontWeight: '700',
      marginRight: 120,
    },
  
    text: {
      fontSize: 26,
      fontWeight: 'bold',
      color: 'black',
    },
    subText: {
      fontSize: 18,
      color: 'black',
      overflow: 'hidden',
    },
  });
  
  export default MySubscription
  