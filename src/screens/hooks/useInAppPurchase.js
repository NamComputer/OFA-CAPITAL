import { useEffect, useState } from "react";
import { Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { requestPurchase } from "react-native-iap";
import * as useIAP from 'react-native-iap'

import {
  STORAGE_KEYS,
  storeBooleanData,
  getBooleanData,
} from "../helpers/asyncStorage";

const { IS_FULL_APP_PURCHASED } = STORAGE_KEYS;
const itemSKUs = Platform.select({
  android: ["1stpayment", "2ndpayment"],
});

const useInAppPurchase = () => {
  const [isFullAppPurchased, setIsFullAppPurchased] = useState(false);
  const [connectionErrorMsg, setConnectionErrorMsg] = useState("");

  const {
    connected,
    products,
    getProducts,
    finishTransaction,
    currentPurchase,
    currentPurchaseError
  } = useIAP;

  useEffect(() => {
    getBooleanData(IS_FULL_APP_PURCHASED).then(data => {
      setIsFullAppPurchased(data);
    });
  }, []);

  useEffect(() => {
    if (connected) {
      getProducts(itemSKUs).then(() => {
        console.log("Getting products...");
      }).catch(error => {
        console.log("Error getting products: ", error);
      });
    }
  }, [connected, getProducts]);

  useEffect(() => {
    const checkCurrentPurchase = async (purchase) => {
      if (purchase) {
        const receipt = purchase.transactionReceipt;
        console.log("RECEIPT: ", receipt);

        if (receipt) {
          setAndStoreFullAppPurchase(true);

          try {
            const ackResult = await finishTransaction(purchase);
            console.log("ackResult: ", ackResult);
          } catch (ackErr) {
            console.log("ackError: ", ackErr);
          }
        }
      }
    };
    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase, finishTransaction]);

  useEffect(() => {
    if (currentPurchaseError) {
      if (
        currentPurchaseError.code === "E_ALREADY_OWNED" &&
        !isFullAppPurchased
      ) {
        setAndStoreFullAppPurchase(true);
      }
    }
  }, [currentPurchaseError]);

  const checkNetworkConnection = async () => {
    const state = await NetInfo.fetch();
    return state.isConnected;
  };

  const purchaseFullApp = async () => {
    if (connectionErrorMsg !== "") setConnectionErrorMsg("");
    const isConnected = await checkNetworkConnection();
    console.log('network checking ...',isConnected)
    if (!isConnected) {
      setConnectionErrorMsg("Please check your internet device connection");
      return;
    }

    if (!connected) {
      console.log('connection checking ...',connected)
      setConnectionErrorMsg("Please check your internet connection to store");
    } else if (products?.length > 0) {
      requestPurchase(itemSKUs[1]);
      console.log("Purchasing products...");
    } else {
      console.log("No products. Now trying to get some...");
      try {
        await getProducts(itemSKUs);
        requestPurchase(itemSKUs[1]);
        console.log("Got products, now purchasing...");
      } catch (error) {
        setConnectionErrorMsg("Please check your internet connection");
        console.log("Everything failed. Error: ", error);
      }
    }
  };

  const setAndStoreFullAppPurchase = (boolean) => {
    setIsFullAppPurchased(boolean);
    storeBooleanData(IS_FULL_APP_PURCHASED, boolean);
  };

  return {
    isFullAppPurchased,
    connectionErrorMsg,
    purchaseFullApp,
  };
};

export default useInAppPurchase;
