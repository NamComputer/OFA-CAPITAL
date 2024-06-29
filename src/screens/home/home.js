import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import Post from '../components/Post';
import { POSTS } from '../data/post';



export default function Home ({navigation})  {

  return (
    <View style={styles.container}>
      
          <View style={styles.header}>
            <TouchableOpacity onPress={()=> navigation.navigate('Scan')}>      
            <Image source={require('../../assets/images/camera.png')} />
            </TouchableOpacity> 
            <Text style={styles.textHeaderBar}>Verify</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('SelectPhotos')}>
              <Image source={require('../../assets/images/add.png')} />
            </TouchableOpacity>
            <TouchableOpacity >
              <Image source={require('../../assets/images/messenger.png')} />
            </TouchableOpacity>
          
          </View>
          <View style={styles.body}>
            <ScrollView horizontal={false}>
              {POSTS.map((post,index)=>(
                  <Post post={post} key={index}/>
              ))}
            </ScrollView>
            
          </View>


      <View style={styles.footer}>
        {/* <Image 
        style={{width: 50, height: 50}}
        source={{uri:'https://instagram.fsgn4-1.fna.fbcdn.net/v/t51.2885-19/155450158_516554275974183_4042415909005765324_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fsgn4-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=fIB8LhGJopIAX8GUaQN&edm=AIQHJ4wBAAAA&ccb=7-4&oh=00_AT9RlPdXukE4xnhGz5CWr9pltffdQ63I7_kjaHFbHP0Yrw&oe=628C8F4E&_nc_sid=7b02f1'}}/> */}
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    flex: .2,
    paddingHorizontal: 20,
 // flex direction giúp cho nội dung như text, icon cùng 1 line
    flexDirection: 'row',
 // alignItem giúp cho nội dung trên line đều được đi qua trung điểm của một đoạn thằng
    alignItems : "center",
 // justifyContent giúp tạo khoảng cách giữa các nội dung trong cùng 1 row
    justifyContent:"space-between"
  },
  body: {
    flex:1,
    justifyContent:'center',
    flexDirection:'column',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  footer: {
    flex:.1,
    alignContent: 'center',
    alignItems: 'center',
  },
  textHeaderBar:{
    fontSize:20,
    fontWeight:'bold',
    marginLeft:120,
    marginRight:100
  }
});

