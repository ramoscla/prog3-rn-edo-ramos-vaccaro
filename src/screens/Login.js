import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/config';




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user == null) {
                this.setState({ loggedIn: false })
            }
        })
    }


    login(){
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((response) => {
            this.setState({loggedIn: true}); 
            this.props.navigation.navigate("HomeMenu");
        })
        .catch(error =>{
            if(this.state.email.includes("@") == false){
                this.setState({error:"Ingrese el email correctamente"});
                console.log(this.state.error)

            }
            else if(this.state.password.length < 6){
                this.setState({error:"La contraseña debe tener 6 caracteres como mínimo"})
                console.log(this.state.error)
            }
            else{
                this.setState({error: "Contraseña incorrecta"});
                console.log(this.state.error)

            }
        })
    }


    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput style={styles.input}
                keyboardType='email-address'
                placeholder='email'
                onChangeText={text => this.setState({ email: text })
            }
                value={this.state.email} />
            <TextInput style={styles.input}
                keyboardType='default'
                placeholder='password'
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password} />
            <TouchableOpacity style={styles.button} onPress={() => this.login()}>
                <Text style={styles.buttonText}> Login </Text>
            </TouchableOpacity>
                <Text style={styles.errorText}>{this.state.error}</Text>
             <Text style={styles.login}>¿No tienes cuenta todavía?</Text>
             <TouchableOpacity style={styles.button}
                onPress={() => this.props.navigation.navigate("Register")}>
            <Text style={styles.buttonText}>Registrarme</Text>
                </TouchableOpacity>
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
        padding: 25,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    input: {
      
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 8,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        alignItems: 'center'
        
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


export default Login

