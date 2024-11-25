import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, FlatList, TextInput } from "react-native";
import { auth, db } from '../firebase/config';



class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            totalPosts:0,
            userData: [], 
            loading: true


        };
    }
    componentDidMount(){
        let currentUser = auth.currentUser

        if (currentUser){
            db.collection('users')
            .where("email", "==",currentUser.email)
            .onSnapshot(
                
                docs => {
                    let userInfo =[]; 
                    docs.forEach(doc => {
                        userInfo.push({
                            id:doc.id,
                            data:doc.data()
                        })
                    this.setState({
                        userData:userInfo[0].data,
                        loading: false

                    })
                    })
                }

            )
        }

    }

    logout() {
        this.props.navigation.navigate("Login")
        auth.signOut()
        this.setState({ loggedIn: false })
    }

    render() {
        return (
            <View>
                <Text> Profile </Text>
                <Text>Hola:</Text>
                <Text> Email: </Text>
                <Text>Cantidad de posts: </Text>
                <Text>Tus Posts:</Text>

                <TouchableOpacity
                    onPress={() => this.logout()}>
                    <Text style={styles.boton}>Cerrar sesión </Text>
                </TouchableOpacity>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    boton: {
        backgroundColor: "lightblue",
        paddingBottom: "2vh",
        paddingTop: "2vh",
        width: "50vw",
        textAlign: "center",
        borderRadius: 10,
        marginBottom: "5%"

    }});

export default Profile

