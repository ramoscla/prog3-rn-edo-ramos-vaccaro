import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from "firebase";
import AntDesign from '@expo/vector-icons/AntDesign';
import { FlatList } from 'react-native-web';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            owner: false,
            amountLikes: this.props.postInfo.data.likes.length

        };
    }

    componentDidMount() {

        if (auth.currentUser && this.props.postInfo.data.likes.includes(auth.currentUser.email)) {
            this.setState({
                liked: true,
                amountLikes: this.props.postInfo.data.likes.length,
            });
        }
        if (auth.currentUser && this.props.postInfo.data.owner.includes(auth.currentUser.email)) {
            this.setState({
                owner: true,
            });
        }
    }

    like() {
        db.collection("posts")
            .doc(this.props.postInfo.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => {
                this.setState({
                    liked: true,
                    amountLikes: this.props.postInfo.data.likes.length
                })
            })
    }

    dislike() {
        db.collection("posts")
            .doc(this.props.postInfo.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => {
                this.setState({
                    liked: false,
                    amountLikes: this.props.postInfo.data.likes.length
                })
            })

    }


    render() {
        return (

             <View style={styles.container}>
                <Text style={styles.ownerText}>Posteado por: {this.props.postInfo.data.owner}</Text>
                <Text style={styles.descriptionText}>{this.props.postInfo.data.description}</Text>
                <Text style={styles.dateText}>{new Date(this.props.postInfo.data.createdAt).toLocaleString()}</Text>

                <View style={styles.actionsContainer}>
                    {
                        this.state.liked ? (
                            <TouchableOpacity style={styles.likeButton} onPress={() => this.dislike()}>
                                <AntDesign name="heart" size={24} color="red" />
                            </TouchableOpacity>


                        ) : (
                            <TouchableOpacity style={styles.likeButton} onPress={() => this.like()}>
                                <AntDesign name="hearto" size={24} color="black" />
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
            padding: 15,
            marginBottom: 15,
            backgroundColor: '#fff',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
            marginHorizontal: 10,
        },
        ownerText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#333',
        },
        dateText: {
            fontSize: 12,
            color: '#888',
            marginBottom: 10,
        },
        descriptionText: {
            fontSize: 14,
            color: '#333',
            marginBottom: 10,
        },
        actionsContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        likesCount: {
            fontSize: 14,
            color: '#333',
            marginLeft: 10,
        },
        deleteButton: {
            backgroundColor: 'red',
            padding: 5,
            borderRadius: 5,
            marginLeft: 'auto',
        },
        deleteButtonText: {
            color: 'white',
            fontSize: 12,
        },
    });
    

export default Post;