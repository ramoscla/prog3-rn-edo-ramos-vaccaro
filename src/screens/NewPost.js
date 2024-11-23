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
           description: descPost
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
            <View>
                <Text>Nuevo Post</Text>
                <View>
                    <TextInput 
                    style={styles.input}
                    placeholder='Agrega una descripción para tu post'
                    value= {this.state.descPost}
                    onChangeText= {(text) => this.setState({descPost: text})}
                    />
                    <TouchableOpacity onPress={()=> this.createPost(this.state.descPost)}>
                    {console.log('Botón presionado')}
                        <Text>
                            Crear Post
                        </Text>
                    </TouchableOpacity>
                    {this.state.error !== "" && (
                     <Text>{this.state.error}</Text>
                    )}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 2,
        borderColor: "black",
        marginBottom: 10
    }
})

export default NewPost;