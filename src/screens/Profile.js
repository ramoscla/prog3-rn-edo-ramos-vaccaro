import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, FlatList, ActivityIndicator } from "react-native";
import { auth, db } from '../firebase/config';
import AntDesign from '@expo/vector-icons/AntDesign';

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
                    });
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
        return (
            <View style={styles.profileContainer}>
                {this.state.loading ? (
                    <ActivityIndicator size="large" color="red" />
                ) : (
                    <View>

                        <View style={styles.headerContainer}>
                            <Text style={styles.welcomeText}>Hola, {this.state.userData.username} 👋</Text>
                            <Text style={styles.emailText}>{this.state.userData.email}</Text>
                            <Text style={styles.postsCount}>
                                Cantidad de posts: {this.state.posts.length}
                            </Text>
                        </View>


                        <View style={styles.divider} />


                        {this.state.posts.length === 0 ? (
                            <Text style={styles.noPostsText}>No tenes posts todavía.</Text>
                        ) : (
                            <View>
                                <Text style={styles.sectionTitle}>Tus Posts</Text>
                                <FlatList
                                    data={this.state.posts}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (
                                        <View style={styles.card}>
                                            <Text style={styles.ownerText}>Posteado por: {item.data.owner}</Text>
                                            <Text style={styles.descriptionText}>{item.data.description}</Text>
                                            <Text style={styles.dateText}>{new Date(item.data.createdAt).toLocaleString()}</Text>
                                            <Text style={styles.likesCount}>Likes: {item.data.likes.length}</Text>
                                            <TouchableOpacity
                                                style={styles.deleteButton}
                                                onPress={() => this.deletePost(item.id)}
                                            >
                                                <AntDesign name="delete" size={22} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>
                        )}


                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={() => this.logout()}
                        >
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
        backgroundColor: '#ffffff',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    emailText: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
    postsCount: {
        fontSize: 14,
        color: '#777',
        marginTop: 5,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginVertical: 20,
    },
    noPostsText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
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
    logoutButton: {
        backgroundColor: '#FF5A5F',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    logoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Profile;
