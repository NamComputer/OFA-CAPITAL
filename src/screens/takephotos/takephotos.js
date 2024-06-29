
import React, { Component } from "react";
import { StyleSheet, Text, View,TouchableOpacity, Image } from "react-native";




export default class SelectPhotoScreen extends Component {
  // state = {};

  // _selectPhoto = async () => {
  //   const status = await getPermission(Permissions.CAMERA_ROLL);
  //   if (status) {
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       base64:true
  //     });
  //     var date = new Date().getDate(); //Current Date
  //     var month = new Date().getMonth() + 1; //Current Month
  //     var year = new Date().getFullYear(); //Current Year
  //     var hours = new Date().getHours(); //Current Hours
  //     var min = new Date().getMinutes(); //Current Minutes
  //     var sec = new Date().getSeconds(); //Current Seconds
    
  //     const currentDate = date + '/' + month + '/' + year + 'T' + hours + ':' + min + ':' + sec
      
      
  //     if (!result.cancelled) {
        
  //       // const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
  //       this.props.navigation.navigate("NewPost", { image: result.base64,id: currentDate });
  //       //console.log(result)
  //       // console.log(currentDate)
  //     }
  //   }
  // };

  // _selectMultiplePhoto = async () => {
  //   // const status = await getPermission(Permissions.CAMERA_ROLL);
  //   // if (status) {
  //   //   const result = await ImagePicker.launchImageLibraryAsync(options);
  //   //   // console.log(result)
  //   //   if (!result.cancelled) {
  //   //     this.props.navigation.navigate("NewPost", { image: result.uri });
  //   //   }
  //   // }
  //   //const result = await ImagePicker.launchImageLibraryAsync(allowsEditing: true)

  //   this.props.navigation.navigate("TakeMultiPhotos")
  // };

  // _next = async () => {
      
  //     this.props.navigation.navigate("NewPost", { image: null });
      
  //   }; 

  // _takePhoto = async () => {
  //   const status = await getPermission(Permissions.CAMERA);
  //   if (status) {
  //     const result = await ImagePicker.launchCameraAsync(options);
  //     if (!result.cancelled) {
  //       this.props.navigation.navigate("NewPost", { image: result.uri });
  //     }
  //   }
  // };

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={()=>this.props.navigation.pop()}>
            <Image style={styles.backArrow} source={require('../../assets/images/chevronleft.png')}/>
        </TouchableOpacity>
        {/* <Text onPress={this._selectPhoto} style={styles.text}>
          Select Photo From Library
        </Text> */}
        <Text onPress={this._selectMultiplePhoto} style={styles.text}>
          Select Photos From Library
        </Text>
        {/* <Text onPress={this._next} style={styles.text}>
          Select Photo From ImageURL
        </Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    padding: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  backArrow:{
    width:50,
    height:50,
    marginTop:50
  },
});

