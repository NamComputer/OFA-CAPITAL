import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Colors} from '../theme/color';
import {withIAPContext} from 'react-native-iap';
import React, {useEffect, useState} from 'react';
import ProductItem from '../components/productItem';
import {
  getProducts, //For fetching available products
  requestPurchase, //For initiating in-app purchases
  purchaseUpdatedListener, //For listening to purchase events
  purchaseErrorListener, //For listening to purchase errors
  finishTransaction, //For acknowledging a purchase
  getAvailablePurchases,
} from 'react-native-iap';
import { posPurchase } from '../hooks';
import { getData } from '../helpers/asyncStorage';

const EditProfile = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
 
  const itemSKUs = Platform.select({
    android: ['20','01','10'],
    ios: ['1stpayment_ios', '2ndpayment_ios'],
  });

  const handlePurchase = async productId => {
    setLoading(true);
    try {
      await requestPurchase({skus: [productId]});
    } catch (error) {
      console.log('error', error);
      Alert.alert('Error occurred while making purchase');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const purchaseUpdateSubscription = purchaseUpdatedListener(
      async purchase => {
        console.log('purchase',purchase )
        const receipt = JSON.parse(purchase.transactionReceipt);
        console.log('receipt',receipt )
        if (receipt ) {
          try {
            const result = await finishTransaction({
              purchase,
              isConsumable: true,
            })

            let id =  await(getData('idUser'))
            const apiTransPOS = await posPurchase({
              "amount": receipt.productId*receipt.quantity,
              "currency": "usd",
              "type": "in-app-purchase",
              "typeId": "2",
              "user": id,
              "detail": receipt.orderId
            });
            console.log('result',result, 'receipt',receipt,'API Result',apiTransPOS);
          
          
          
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

    const fetchProducts = async () => {
      try {
        const investmentProducts = await getAvailablePurchases();
        const investmentProductIds = investmentProducts.map(
          item => item.productId,
        );

        //console.log('investment Products',investmentProducts);

        const result = (await getProducts({skus: itemSKUs})).map(item => ({
          ...item,
          purchased: investmentProductIds.indexOf(item.productId) !== -1,
        }));
        console.log('----present product------',result)
        setProducts(result);
        setLoading(false);
      } catch (error) {
        Alert.alert('Error fetching products');
      }
    };

    fetchProducts();

    return () => {
      purchaseUpdateSubscription.remove();
      purchaseErrorSubscription.remove();
    };
  }, []);

  const notifySuccessfulPurchase = () => {
    Alert.alert('Success', 'Purchase successful');
  };

 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            setProducts([]), navigation.pop();
          }}>
          <Image
            style={styles.backArrow}
            source={require('../../assets/images/chevronleft.png')}
          />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Product List</Text>
      </View>

      <View style={styles.body}>
        {!isLoading ? (
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
                //purchased={product.purchased}
                onPress={() => handlePurchase(product.productId)}
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
    flex: 0.1,

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

export default withIAPContext(EditProfile);
