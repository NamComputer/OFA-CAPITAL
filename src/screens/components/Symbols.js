import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Dimensions } from 'react-native';
import constants from '../../constants/constants';
import { useState } from 'react';
import images from '../../assets/images';

export default class Symbol extends Component{
  constructor(props){
    super(props)
 
}

getImage = () => {
        switch(this.props.symbol){
    
          case "B":
            return images.bell;
       
          case "C":
            return images.cherry
    
          case "X":
            return images.clock
         
          case "D":
            return images.dice
       
          case "G":
            return images.grape
         
          case "L":
            return images.lemon
   
          case "M":
            return images.melon
       
          case "O":
            return images.orange
       
          case "P":
            return images.plum
          
          case "7":
            return images.seven
      
          case "S":
            return images.star
       
          default:
       
          return images.dice    
        }}

render(){
  let symbolSource = this.getImage()
  return (
    <View style={[styles.container,{width:this.props.width,height:this.props.height}]} >
      <Image style={{width:this.props.width-20,height:this.props.height-20}} resizeMode='contain' source={symbolSource}/>
    </View>
  ) 

}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row'
  
  },
})




// const Symbol = ({
//     symbol,
//     width,
//     height,
//     el,
//     idx
//   }) => {


//     const getImage = () => {
//       switch(symbol){
  
//         case "B":
//           return images.bell;
//           break;
//         case "C":
//           return images.cherry
//           break;
//         case "X":
//           return images.clock
//           break;
//         case "D":
//           return images.dice
//           break;
//         case "G":
//           return images.grape
//           break;
//         case "L":
//           return images.lemon
//           break;
//         case "M":
//           return images.melon
//           break;
//         case "O":
//           return images.orange
//           break;
//         case "P":
//           return images.plum
//           break;
//         case "7":
//           return images.seven
//           break;
//         case "S":
//           return images.star
//           break;
//         default:
     
//         return images.dice    
          

//       }
//     }

//     return (
   
//         <View style={[styles.container,{width:width,height:height}]} >
//           <Image style={{width:width-20,height:height-20}} resizeMode='contain' source={getImage}/>
            
   
//         </View>

//     );
//   };
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: 'red',
//       padding: 10
//     },
   
// })
// export default Symbol;