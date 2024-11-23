import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from "firebase";

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            liked: false,
            amountLikes: 0
            
        };
    }

    componentDidMount(){
        console.log(this.props.postIndfo);
        if(this.props.postInfo.data.likes.includes(auth.currentUser.email)){
            this.setState({
                liked: true,
                amountLikes: 0,
            })
        }
    }

    like(){
        db.collection("posts")
        .doc(this.props.postInfo.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
                liked: true,
                amountLikes: this.props.postInfo.data.likes.length
            })
        })
    }

    dislike(){
        db.collection("posts")
        .doc(this.props.postInfo.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
                liked: false,
                amountLikes: this.props.postInfo.data.likes.length
            })
        })

    }
    
    render(){
        return(
            <View>
                <Text> Posteado por: {this.props.postInfo.data.owner} </Text>
                <Text> {this.props.postInfo.data.description} </Text>
                <Text> { new Date(this.props.postInfo.data.createdAt).toLocaleString()} </Text>

                {
                    this.state.liked ? (
                        <TouchableOpacity onPress={() => this.dislike()}>
                            <Text>
                            Ya no me gusta
                            </Text>
                        
                        </TouchableOpacity> ) :(
                        <TouchableOpacity onPress={() => this.like()}>
                            <Text>
                            Me gusta
                            </Text>
                         
                         </TouchableOpacity>)        
            
                }
                <Text> Cantidad de likes: {this.state.amountLikes} </Text>
            </View>

        )
        
           
    }

}

export default Post;