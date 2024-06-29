// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
// import { ImagePicker } from 'expo-image-picker-multiple'


// export default function TakeMultiPhotos ({navigation}) {
//   return (
//     <View style={styles.container}>
//         <TouchableOpacity onPress={()=>navigation.pop()}>
//             <Image style={styles.backArrow} source={require('../../assets/images/chevronleft.png')}/>
//         </TouchableOpacity>
        
//         <ImagePicker
//             // theme={{
//             //     header: WhatsAppHeader,
//             //     album: WhatsAppAlbum,
//             //     check: WhatsAppCheck,
//             // }}
//             onSave={(assets) => console.log(assets)}
//             onCancel={() => console.log('no permissions or user go back')}
//             galleryColumns={4}
//             multiple
//             noAlbums
//         />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   backArrow:{
//     width:50,
//     height:50,
//     marginTop:50
//   },

// });

import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Button,
  ActivityIndicator
} from 'react-native'


import ImageTile from './imagetitle'

import { Image, ImageStore, ImageEditor } from 'react-native'

const { width } = Dimensions.get('window')

export default class TakeMultiPhotos extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     photos: [],
  //     selected: [],
  //     after: null,
  //     hasNextPage: true
  //   }
  // }

  // componentDidMount () {
  //   this.getPhotos()
  //   this.setState({ badgeColor: this.props.badgeColor ? this.props.badgeColor : '#007aff' })
  // }

  // selectImage = (index) => {
  //   let newSelected = Array.from(this.state.selected)

  //   if (newSelected.indexOf(index) === -1) {
  //     newSelected.push(index)
  //   } else {
  //     const deleteIndex = newSelected.indexOf(index)
  //     newSelected.splice(deleteIndex, 1)
  //   }

  //   if (newSelected.length > this.props.max) return
  //   if (newSelected.length === 0) newSelected = []

  //   this.setState({ selected: newSelected })
  // }

  // getPhotos = async () => {
  //   const status = await getPermission(Permissions.CAMERA_ROLL);
  //   if (status){
  //     let params = { first: 500 }
  //     if (this.state.after) params.after = this.state.after
  //     if (!this.state.hasNextPage) return
  //     MediaLibrary
  //       .getAssetsAsync(params)
  //       .then((assets) => {
  //         this.processPhotos(assets)
  //       })
  //     }
    
  // }

  // processPhotos = (assets) => {
   
  //   if (this.state.after === assets.endCursor) return

  //   let displayAssets
  //   if (this.props.mediaSubtype == null) {
  //     displayAssets = assets.assets
  //   } else {
  //     displayAssets = assets.assets.filter((asset) => {
  //       return asset.mediaSubtypes.includes(this.props.mediaSubtype)
  //     })
  //   }

  //   this.setState({
  //     photos: [...this.state.photos, ...displayAssets],
  //     after: assets.endCursor,
  //     hasNextPage: assets.hasNextPage
  //   })
  // }

  // getItemLayout = (data, index) => {
  //   let length = width / 4
  //   return { length, offset: length * index, index }
  // }
  
  // prepareCallback = async() => {
  //   let { selected, photos } = this.state
  //   let imageUrlArray = [];
  //   const selectedPhotos = selected.map(i => photos[i])
  //   // console.log(selectedPhotos)
  //   for (let i = 0; i<selectedPhotos.length;i++){
  //     var appleId = selectedPhotos[i].uri.substring(5, 41);
  //     const ext = 'JPG';
  //     var myDate = new Date(selectedPhotos[i].creationTime*1000)

  //     imageUrlArray.push({
  //       id:selectedPhotos[i].uri,
  //       content:`assets-library://asset/asset.${ext}?id=${appleId}&ext=${ext}`,
  //       createdAt: myDate.toUTCString()
  //     })
     
  //   }
  //   this.props.navigation.navigate("NewPost", { image: imageUrlArray});
  // }
    

  //   // const assetsInfo = Promise.all(selectedPhotos.map(i => MediaLibrary.getAssetInfoAsync(i)))
  //   // this.props.callback(assetsInfo)
  

  // renderHeader = () => {
  //   let selectedCount = this.state.selected.length

  //   let headerText = `${selectedCount} ${this.props.headerSelectText ? this.props.headerSelectText : 'Selected'}`
  //   if (selectedCount === this.props.max) headerText = headerText + ' (Max)'
  //   const headerCloseText = this.props.headerCloseText ? this.props.headerCloseText : 'Close'
  //   const headerDoneText = this.props.headerDoneText ? this.props.headerDoneText : 'Done'
  //   const headerButtonColor = this.props.headerButtonColor ? this.props.headerButtonColor : '#007aff'

  //   return (
  //     <View forceInset={{ top: 'always' }} style={{ height: 52, marginTop:30 }}>
  //       <View style={styles.header}>

  //         <Button
  //           color={headerButtonColor}
  //           title={headerCloseText}
  //           onPress={() => this.props.navigation.pop()}
  //         />
  //         <Text style={styles.headerText}>{headerText}</Text>
  //         <Button
  //           color={headerButtonColor}
  //           title={headerDoneText}
  //           onPress={() => this.prepareCallback()}
  //         />

  //       </View>
  //     </View>
  //   )
  // }

  renderImageTile = ({ item, index }) => {
    const selected = this.state.selected.indexOf(index) !== -1
    const selectedItemCount = this.state.selected.indexOf(index) + 1

    return (
      <ImageTile
        item={item}
        selectedItemCount={selectedItemCount}
        index={index}
        camera={false}
        selected={selected}
        selectImage={this.selectImage}
        badgeColor={this.state.badgeColor}
      />
    )
  }

  renderLoading = () => {
    return (
      <View style={styles.emptyContent}>
        <ActivityIndicator size='large' color={this.props.loadingColor ? this.props.loadingColor : '#bbb'} />
      </View>
    )
  }

  renderEmpty = () => {
    return (
      <View style={styles.emptyContent}>
        <Text style={styles.emptyText}>{this.props.emptyText ? this.props.emptyText : 'No image'}</Text>
      </View>
    )
  }

  renderImages = () => {
    return (
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={this.state.photos}
        numColumns={4}
        renderItem={this.renderImageTile}
        keyExtractor={(_, index) => index}
        onEndReached={() => { this.getPhotos() }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={this.renderEmpty}
        initialNumToRender={24}
        getItemLayout={this.getItemLayout}
      />
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderImages()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    width: width,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 19
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    color: '#bbb',
    fontSize: 20
  }
})


