import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, FlatList, TextInput } from "react-native";
import { auth, db } from '../firebase/config';



class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            userData: [], 
            loading: true

        };
    }
    componentDidMount(){
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
                <TouchableOpacity
                    onPress={() => this.logout()}>
                    <Text style={styles.boton}>Desloguear</Text>
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

