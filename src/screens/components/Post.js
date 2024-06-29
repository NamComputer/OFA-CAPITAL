import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';
import { Colors } from '../theme/color';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const postFooterIcons = [
  {
    name:'Like',
    imageURL:'https://img.icons8.com/ios/344/approval.png',
    likedImageURL:'https://img.icons8.com/office/344/approval.png'
  },
  {
    name:'Comment',
    imageURL:'https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/48/000000/external-comment-communication-royyan-wijaya-detailed-outline-royyan-wijaya.png',
  },
  {
    name:'Share',
    imageURL:'https://img.icons8.com/ios/48/000000/paper-plane.png',
  },
  {
    name:'Save',
    imageURL:'https://img.icons8.com/external-bearicons-detailed-outline-bearicons/48/000000/external-Save-social-media-bearicons-detailed-outline-bearicons.png'
  }
]



const Post = ({post}) => {

  function pressOrNotPress(){
    
    if (likes - preLikes == 2){
      setPress(false);
      setLikes(likes-1)
    }
    if (likes - preLikes == 1){
      setPress(false);
      setLikes(likes-1)
    }
    else{
      setPress(true);
      setLikes(likes+1)
    }
  }
  
  const [likes, setLikes] = useState(4)
  const [preLikes, setPreLikes] = useState(likes)
  const [press, setPress] = useState(false)
  return (
    <View style={styles.container}>
       <Divider width={100} orientation='vertical' />
       <PostHeader post={post} />
       <PostImage post={post} />
       <View>
          <View style={styles.postFooter}>
            <View style={styles.leftPostFooter}>
             <TouchableOpacity  onPress={() => {pressOrNotPress()}}> 
             {
             press ? <Icon 
                imgStyle={styles.footerIcon} imgURL={postFooterIcons[0].likedImageURL}
              />:
              <Icon 
                imgStyle={styles.footerIcon} imgURL={postFooterIcons[0].imageURL}
              />}
            </TouchableOpacity>
              {/* <Icon 
                imgStyle={styles.footerIcon} imgURL={postFooterIcons[1].imageURL}
              /> */}
              {/* <Icon 
                imgStyle={styles.footerIcon} imgURL={postFooterIcons[2].imageURL}
              /> */}
            </View>
            <View style={styles.rightPostFooter}>
              <Icon 
                imgStyle={styles.footerIcon} imgURL={postFooterIcons[3].imageURL}
              />
            </View>
          </View>
          <Likes post={post} like={likes} />
          <Caption post={post} />
          {/* <CommentsSection post={post} /> */}
          {/* <Comments post={post} /> */}
       </View>
    </View>
  );
}

const PostHeader = ({post}) => {
  return(
  <View style={styles.postContainer}>
    <View style={styles.postHeader}>
      <Image style={styles.imageProfile} source={{uri:post.profile_picture}} />
      <Text style={styles.nameProfile}>{post.user}</Text>
    </View>

    <TouchableOpacity>
      <Text style={styles.dot}>
      ...
      </Text>
    </TouchableOpacity>
  </View> 
  
  )
}


const PostImage = ({post}) => {
  return(
  <View>
    <Image style={styles.imagePost} source={{uri:post.imageURL}}/>
  </View>
  )
}

// const PostFooter = () =>{
//   return(
//     <View style={styles.postFooter}>
//       <View style={styles.leftPostFooter}>
//         <Icon 
//           imgStyle={styles.footerIcon} imgURL={postFooterIcons[0].imageURL}
//         />
//         <Icon 
//           imgStyle={styles.footerIcon} imgURL={postFooterIcons[1].imageURL}
//         />
//         <Icon 
//           imgStyle={styles.footerIcon} imgURL={postFooterIcons[2].imageURL}
//         />
//       </View>
//       <View style={styles.rightPostFooter}>
//         <Icon 
//           imgStyle={styles.footerIcon} imgURL={postFooterIcons[3].imageURL}
//         />
//       </View>
//     </View>
//   )
// }

const Icon = ({imgStyle,imgURL}) => {
  return(
    <Image style={imgStyle} source={{uri:imgURL}}/>
)}



const Likes = ({post, like}) => (
  <View style={styles.viewLikes}>
    <Text style={styles.like}>
      {/* {post.likes.toLocaleString('en')} likes */}
      {like} likes
    </Text>
  </View>
)

const Caption = ({post}) =>{
  return(
    <View style={styles.captionPart}>
      <Text style={styles.like}>
        {post.user}
      </Text>
      <Text style={styles.caption}>
        {post.caption}
      </Text>
  </View>
  )
}

const CommentsSection = ({post}) =>(
  <View style={{marginTop:5}}>
    {!!post.comments.length &&(
    <Text style={styles.commentPart}>
      View {post.comments.length > 1?'all':''} {post.comments.length}{' '}
      {post.comments.length > 1?'comments':'comment'}
    </Text>)
    }
  </View>
)

const Comments = ({post}) => (
  <View>
    {post.comments.map((comment, index) => 
    (
      <View style={styles.viewLikes} key={index}>
        <Text style={{color:'black'}}>
          <Text style={styles.like}>{comment.user}{' '}</Text>
          {comment.comment}
        </Text>
      </View>
    ))
    }
  </View>
)


export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop:30,
    marginBottom:30
  },
  postContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    margin:5,
    alignItems:'center'
  },
  postHeader:{
    flexDirection:'row',
    alignItems:'center'
  },
  imageProfile:{
    borderRadius:50,
    width: 50, 
    height: 50,
  },
  imagePost:{
    resizeMode:'cover',
    height: 315,
    width: '100%',
  },
  nameProfile:{
    color:Colors.dark,
    marginLeft: 5,
    fontWeight:'700',
  },
  dot:{
    fontWeight:'700',
    marginLeft: windowWidth/1.4
  },
  footerIcon:{
    width:33,
    height:33,
    marginLeft:10,
    marginTop:10
  },
  postFooter:{
    flexDirection:'row',
    // justifyContent:'space-between'
  },
  leftPostFooter:{
    flexDirection:'row',
  },
  rightPostFooter:{
    marginRight:10,
    flex:1,
    alignItems:'flex-end'
  },
  like:{
    color:Colors.dark,
    fontWeight:'600'
  },
  caption:{
    marginLeft:5,
    color:Colors.dark,
  },
  viewLikes:{
    flexDirection:'row',
    marginLeft:10
  },
  captionPart:{
    flexDirection:'row',
    marginLeft:10
  },
  commentPart:{
    marginLeft:10,
    color:Colors.hint
  }
})
