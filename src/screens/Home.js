import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { auth, db } from '../firebase/config';
import { FlatList } from 'react-native-web';



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){
        db.collection('posts').onSnapshot(
            docs=> {
                let posts = []; 
                docs.forEach(doc => {
                    posts.push({
                        id:doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts, 
                        loading: false
                    })
                })
            }
        )
    }


    render() {
        if (!this.state.loading){
            console.log(this.state.posts)
            return(
                <View style = {StyleSheet.container}>
                    <FlatList style = {StyleSheet.flatlist}
                    data ={this.state.posts}
                    keyExtractor ={item => item.id.toString()}
                    renderItem={({ item}) => 
                    <Post email = {item.data.email} post ={item.data.post}
                    createdAt = {item.data.createdAt} id = {item.id} likedBy = {item.data.likedBy} />
                    }
                    />
                
                </View>
            );

        }
        
  
    }
}


export default Home

