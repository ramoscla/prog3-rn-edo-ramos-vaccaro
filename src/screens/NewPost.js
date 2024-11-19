import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';


class NewPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            descPost: "",
        };
    }

    createPost(descPost){
        if (descPost === ""){
            alert("Ingresa una descripción para poder crear un post");
            return;
        }
        db.collection("posts").add({
           owner: auth.currentUser.email,
           createdAt: Date.now(),
           desciption: descPost
        })

    }
    render(){
        return(
            <View>
                <Text>Nuevo Post</Text>
                <View>
                    <TextInput 
                    style={styles.input}
                    placeholder='Agregar una descripcion para tu post'
                    value= {this.state.descPost}
                    onChangeText= {(text) => this.setState({descPost: text})}
                    />
                    <TouchableOpacity onPress={()=> this.createPost(this.state.descPost)}>
                        <Text>
                            Crear Post
                        </Text>
                    </TouchableOpacity>

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