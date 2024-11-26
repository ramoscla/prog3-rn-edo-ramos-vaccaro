import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, FlatList, TextInput, ActivityIndicator } from "react-native";
import { auth, db } from '../firebase/config';
import AntDesign from '@expo/vector-icons/AntDesign';
import Post from "../components/Post";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            userData: [],
            loading: true,
        };
    }


    componentDidMount() {
        let currentUser = auth.currentUser;


        if (currentUser) {
            db.collection('users')
                .where("email", "==", currentUser.email)
                .onSnapshot((docs) => {
                    let userInfo = [];
                    docs.forEach((doc) => {
                        userInfo.push({
                            id: doc.id,
                            data: doc.data()
                        });
                    })
                    this.setState({
                        userData: userInfo[0].data,
                        loading: false,
                    });
                });


            db.collection('posts')
                .where("owner", "==", currentUser.email)
                .onSnapshot((docs) => {
                    let arrDocs = [];
                    docs.forEach((doc) => {
                        arrDocs.push({
                            id: doc.id,
                            data: doc.data()
                        });


                    });
                    this.setState({
                        posts: arrDocs,
                        loading: false
                    });
                });
        }
    }


    deletePost = (id) => {
        db.collection("posts")
            .doc(id)
            .delete()
            .then(() => {
                console.log("Post eliminado");
            })
            .catch((error) => {
                console.log(error);
            });
    };


    logout() {
        this.props.navigation.navigate("Login");
        auth.signOut();
        this.setState({ loggedIn: false });
    }


    render() {
        console.log(this.state.userData);
        return (
            <View>
                {this.state.loading ? (
                    <ActivityIndicator size='large' color='red' />
                ) : (
                    <View>
                       
                        <Text style={styles.noCardTextTitle}>Hola {this.state.userData.username}</Text>
                        <Text style={styles.noCardText}>Email: {this.state.userData.email}</Text>
                        <Text style= {styles.noCardText}>Cantidad de posts: {this.state.posts.length}</Text>


                        {this.state.posts.length === 0 ? (
                            <Text>No tienes posts!</Text>
                        ) : (
                            <View>
                                <Text style ={styles.noCardTextTitle}>Tus Posts:</Text>
                                <FlatList
                                    data={this.state.posts}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (
                                        <View style={styles.card}>
                                            <Text style={styles.ownerText}>Posteado por: {item.data.owner}</Text>
                                            <Text style={styles.descriptionText}>{item.data.description}</Text>
                                            <Text style={styles.dateText}>{new Date(item.data.createdAt).toLocaleString()}</Text>
                                            <Text style={styles.likesCount}>Cantidad de likes: {item.data.likes.length}</Text>
                                            <TouchableOpacity style={this.state.owner ? styles.deleteOn : styles.deleteOff} onPress={() => this.deletePost(item.id)}>
                                                <AntDesign name="delete" size={22} color="dark-grey" />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    style={{ flex: 1 }}
                                />
                            </View>
                        )}


                        <TouchableOpacity style={styles.logoutButton} onPress={() => this.logout()}>
                            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f8fa',
    },
    profileTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profileText: {
        fontSize: 18,
        marginBottom: 5,
    },
    noPostsText: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    ownerText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    descriptionText: {
        fontSize: 14,
        marginBottom: 5,
    },
    dateText: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 5,
    },
    likesCount: {
        fontSize: 14,
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    logoutButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    noCardTextTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
        marginHorizontal: 5,
    },
    noCardText:{
        fontSize: 14,
        marginBottom: 10,
        marginHorizontal:5,

    }
});



export default Profile;

