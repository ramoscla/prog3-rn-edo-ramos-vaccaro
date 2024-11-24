import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';


class NewPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            descPost: "",
            error: "",
        };
    }

    createPost(descPost){
        if (!auth.currentUser) {
            this.setState({ error: "Tu usuario no esta autenticado" });
            return;
        }
        if (descPost === ""){
            this.setState({ error: "Ingresa una descripción para poder crear un post" });
            return;
        }
        db.collection("posts").add({
           owner: auth.currentUser.email,
           createdAt: Date.now(),
           description: descPost,
           likes: []
        })
        .then(() => {
            this.setState({ descPost: "", error: "" });
        })
        .catch((error) => {
            this.setState({ error: "Hubo un problema al crear el post. Intente denuevo." });
        });

    }

    render(){
        return(
            <View style={styles.container}>
            <Text style={styles.title}>Crea un nuevo Post</Text>
            <View style={styles.form}>
                <TextInput 
                    style={styles.input}
                    placeholder='Agrega una descripción para tu post'
                    value={this.state.descPost}
                    onChangeText={(text) => this.setState({ descPost: text })}
                />
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => this.createPost(this.state.descPost)}
                >
                    <Text style={styles.buttonText}>Crear Post</Text>
                </TouchableOpacity>
                {this.state.error !== "" && (
                    <Text style={styles.errorText}>{this.state.error}</Text>
                )}
            </View>
        </View>
    );
}
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
},
form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
},
input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
},
button: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
},
buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
},
errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
}
});


export default NewPost;