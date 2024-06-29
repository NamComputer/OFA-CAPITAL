
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';

import {widthPercentageToDP as scaleWidth} from 'react-native-responsive-screen';

export default function Scan({navigation}) {
  // let cameraRef = useRef();
  // const [hasCameraPermission, setHasCameraPermission] = useState();
  // const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  // const [photo, setPhoto] = useState();

  // useEffect(() => {
  //   (async () => {
  //     const cameraPermission = await Camera.requestCameraPermissionsAsync();
  //     const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
  //     setHasCameraPermission(cameraPermission.status === "granted");
  //     setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
  //   })();
  // }, []);

  // if (hasCameraPermission === undefined) {
  //   return <Text>Requesting permissions...</Text>
  // } else if (!hasCameraPermission) {
  //   return <Text>Permission for camera not granted. Please change this in settings.</Text>
  // }

  // let takePic = async () => {
  //   let options = {
  //     quality: 1,
  //     base64: true,
  //     exif: false
  //   };

  //   let newPhoto = await cameraRef.current.takePictureAsync(options);
  //   setPhoto(newPhoto);
  // };

  // if (photo) {
  //   let sharePic = () => {
  //     shareAsync(photo.uri).then(() => {
  //       setPhoto(undefined);
  //     });
  //   };

  //   let savePhoto = () => {
  //     MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {x
  //       setPhoto(undefined);
  //     });
  //   };

  //   return (
  //     <SafeAreaView style={styles.container}>
  //       <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
  //       <Button title="Share" onPress={sharePic} />
  //       {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
  //       <Button title="Discard" onPress={() => setPhoto(undefined)} />
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={styles.container} ref={cameraRef}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.pop()}>
            <Image style={styles.backArrow} source={require('../../assets/images/chevronleft.png')}/>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Take Pic" onPress={takePic} />
      </View>

      {/* <StatusBar style="auto" /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    flex: .8,
    flexDirection:'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    width:'100%',
    height:'100%',
  },
  buttonContainer: {
    
    
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  },
   backArrow:{
    width:50,
    height:50,
    marginBottom: scaleWidth(170)
  },
});


// import React, { useState, useEffect } from 'react';
// import { Text, View, StyleSheet, Button } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';

// export default function Scan() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     alert(`Bar code with type ${type} and data ${data} has been scanned!`);
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={StyleSheet.absoluteFillObject}
//       />
//       {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//   },
// });
