import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, useState,TouchableOpacity,Dimensions } from 'react-native';
import constants from '../../constants/constants';
import Reel from './Reel';



export default class SetReel extends Component{
  constructor(props){
    super(props)
    this.state ={
      width: null,
      height: null,
    }
}

  onLayout = (e) => {
  this.setState({
    width: e.nativeEvent.layout.width,
    heigh: e.nativeEvent.layout.height,
  })
  }

  renderReels = () =>{
      let reelWidth = this.state.width / constants.REELS

      let reelList = Array.apply(null, Array(constants.REELS)).map((el,idx)=>(
        <Reel width={reelWidth} height={this.state.height} key ={idx} index={idx}/>
      ))

  
      return (
        <>
          {reelList}
        </>
      );
    }
    
  render(){
    return (
      <View style = {styles.container} onLayout={this.onLayout}>
        {this.state.width && this.state.height && this.renderReels()}
      </View>
    )
  }}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'orange',
      flexDirection:'row'
    
    }
  })
