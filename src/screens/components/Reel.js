import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Dimensions } from 'react-native';
import constants from '../../constants/constants';
import { useState } from 'react';
import {Symbol} from './Symbols';


export default class Reel extends Component{
  constructor(props){
    super(props)

    this.symbols = "BBCDGLGLCCCLLDDMS777XDBL",
    this.symbolsHeight = this.props.height / constants.SYMBOLS
}
render(){
  return (
    <View style={[styles.container,{width:this.props.width, height:this.props.height}]}>
       <View style = {{width: this.props.width,height:this.symbols.length * this.symbolsHeight}}>
             {this.symbols.split("").map((el,idx)=>{
               return  <Symbol symbol={el} key ={idx} index = {idx} width={this.props.width} height={this.symbolsHeight}/>
             })}

        </View>
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

// const Reel = ({
//     width,
//     height,
//     length
//   }) => {

//     const symbols = "BBCDGLGLCCCLLDDMS777XDBL"
//     const symbolsHeight = height / constants.SYMBOLS

//     return (
   
//         <View style={[styles.container,{width:width,height:height}]} >
//           <View style = {{width: width,height:length*symbolsHeight}}>
//             {symbols.split("").map((el,idx)=>{
//               return  <Symbol symbol={el} key ={idx} index = {idx} width={width} height={symbolsHeight}/>
//             })}
//           </View>
//         </View>

//     );
//   };
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: 'orange',
//       overflow:'hidden'
//     },
   
// })
// export default Reel;