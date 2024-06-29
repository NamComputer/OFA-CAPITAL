import React, { useState } from 'react';
import { Image, TextInput, View, StyleSheet, TouchableOpacity, Text, Button, Alert } from 'react-native';
import { Colors } from '../../theme/color';
import * as Yup from 'yup';
import  { Form, Formik } from 'formik'
import { Divider } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';


// const UPLOAD = gql`
//   mutation AddTodo($content: String!, $name: String!, $caption: String!) {
//     uploadCV(uploadCVInput: {
//       content: $content,
//       name: $name,
//       caption: $caption
//     }) {
//       id
//       name 
//       content 
//       caption
//     }
//   }
// `;



export default function NewPostScreen ({navigation,route}) {

  const [uploadCV, { data, loading, error }] = useState(UPLOAD);

    const placeholderImage = 'https://cdn.unenvironment.org/2022-03/field-ge4d2466da_1920.jpg'
    const uploadPostSchema = Yup.object({
      imageUrl: Yup.string().url('Invalid').required('A Url is required'),
      caption: Yup.string().max(10,'Caption has reached the limit')
    })
    const uploadNonImageUrlPostSchema = Yup.object({
      caption: Yup.string().max(100,'Caption has reached the limit')
    })
    
    const {image, id, length} = route.params;
    const [thumbnailUrl, setThumbnailUrl] = useState(image)
    return (
      <View style={styles.container}>
        <View style={styles.header}>     
          <TouchableOpacity onPress={()=>navigation.pop()}>
              <Image style={styles.backArrow} source={require('../../assets/images/chevronleft.png')}/>
          </TouchableOpacity>
          <Text style={styles.headerText}>NEW POST</Text>
        </View>
        {image != null ?
        <Formik
        initialValues={{caption:'', imageURL: ''}}
        onSubmit={async (value) => {
          try{
           const result = await uploadCV({ variables:{
            content: image,
            name: "Test",
            caption: value.caption,
           }
          })}catch(error){
            console.log(error)
          }
          
        }}
        validationSchema={uploadNonImageUrlPostSchema}
        validateOnMount={true}
       >
        {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
          <>
          <View style={styles.imageCaption}>
          {image.length >= 1 ?
            <FlatList 
              horizontal={true}
              data={image}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Image style={styles.image} 
                source={{uri:item.content}}/> 
              )}
            />:
            <Image style={styles.image} 
            source={{uri: `data:image/gif;base64,${image}`}} />
              }
            <TextInput placeholder='Write a caption...' 
            placeholderTextColor={Colors.hint} 
            multiline={true}
            onChangeText={handleChange('caption')}
            onBlur={handleBlur('caption')}
            value={values.caption}
            />
          </View>
          <Divider width={100}  orientation='vertical' />
          {/* <TextInput 
            onChange={e => setThumbnailUrl(e.nativeEvent.text)}
            placeholder='Enter Image URL' 
            placeholderTextColor={Colors.hint} 
            onChangeText={handleChange('imageURL')}
            onBlur={handleBlur('imageURL')}
            value={values.imageURL}
            /> */}
            {errors.caption && (
              <Text style={styles.errors}>{errors.caption}</Text>
            )} 
            <Button onPress={handleSubmit} title="Share" />
          </>
        )}
       </Formik> 
        :
       <Formik
        initialValues={{caption:'', imageURL: ''}}
        onSubmit={(value) => console.log(value)}
        validationSchema={uploadPostSchema}
        validateOnMount={true}
       >
        {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
          <>
          <View style={styles.imageCaption}>
            
            <TextInput placeholder='Write a caption...' 
            placeholderTextColor={Colors.hint} 
            multiline={true}
            onChangeText={handleChange('caption')}
            onBlur={handleBlur('caption')}
            value={values.caption}
            />
          </View>
          <Divider width={100}  orientation='vertical' />
          <TextInput 
            onChange={e => setThumbnailUrl(e.nativeEvent.text)}
            placeholder='Enter Image URL' 
            placeholderTextColor={Colors.hint} 
            onChangeText={handleChange('imageURL')}
            onBlur={handleBlur('imageURL')}
            value={values.imageURL}
            />
            {errors.imageURL && (
              <Text style={styles.errors}>{errors.imageURL}</Text>
            )} 
            <Button onPress={handleSubmit} title="Share" />
          </>
        )}
       </Formik> 
       }
       
        {/* /* <TextInput
          multiline
          style={{ flex: 1, paddingHorizontal: 26, color:Colors.dark }}
          placeholder="Add a neat description..."
          onChangeText={text => {
            this.setState({ text });
            this.props.navigation.setParams({ text });
          }}
        /> */}
      </View>
    );
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
  body:{
    paddingTop: 100, 
    justifyContent:'center' 
  },
  header:{
    flex:.2,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  headerText:{
    color:Colors.dark,
    marginRight:140,
    fontSize:20,
    fontWeight:'500'
  },
  image:{
    width:150,
    height:150,
    marginBottom:100,
    marginRight: -10
  },
  imageCaption:{
  flexDirection:'row',
  justifyContent:'space-between' ,
  },
  errors:{
    color:Colors.red,
    fontSize:20
  },
  backArrow:{
    width:50,
    height:50,
  },
});

