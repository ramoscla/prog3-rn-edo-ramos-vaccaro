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
            amountLikes: this.props.postInfo.data.likes.length
            
        };
    }

    componentDidMount(){

        if(this.props.postInfo.data.likes.includes(auth.currentUser.email)){
            this.setState({
                liked: true,
                amountLikes: this.props.postInfo.data.likes.length,
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
            <View style={styles.container}>
            <Text style={styles.ownerText}>Posteado por: {this.props.postInfo.data.owner}</Text>
            <Text style={styles.descriptionText}>{this.props.postInfo.data.description}</Text>
            <Text style={styles.dateText}>{ new Date(this.props.postInfo.data.createdAt).toLocaleString()}</Text>

            <View style={styles.likeContainer}>
                {
                    this.state.liked ? (
                        <TouchableOpacity style={styles.likeButton} onPress={() => this.dislike()}>
                            <Text style={styles.likeText}>Ya no me gusta</Text>
                        </TouchableOpacity> 
                    ) : (
                        <TouchableOpacity style={styles.likeButton} onPress={() => this.like()}>
                            <Text style={styles.likeText}>Me gusta</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <Text style={styles.likesCount}>Cantidad de likes: {this.state.amountLikes}</Text>
        </View>
    );
}
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginTop: 10,
    },
    ownerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    descriptionText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 12,
        lineHeight: 24,
    },
    dateText: {
        fontSize: 14,
        color: '#888',
        marginBottom: 16,
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    likeButton: {
        backgroundColor: '#FF5A5F',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 30,
        marginRight: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    likeText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    likesCount: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    }
});

export default Post;