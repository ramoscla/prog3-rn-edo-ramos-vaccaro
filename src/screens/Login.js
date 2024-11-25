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
            <Text style={styles.login}>Login</Text>
            <TextInput style={styles.field}
                keyboardType='email-address'
                placeholder='email'
                onChangeText={text => this.setState({ email: text })
            }
                value={this.state.email} />
            <TextInput style={styles.field}
                keyboardType='default'
                placeholder='password'
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password} />
            <TouchableOpacity  onPress={() => this.login()}>
                <Text style={styles.boton}> Login </Text>
            </TouchableOpacity>
                <Text style={styles.error}>{this.state.error}</Text>
             <Text style={styles.login}>¿No tienes cuenta todavía?</Text>
             <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Register")}>
            <Text style={styles.registrarme}>Registrarme</Text>
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

    },
    error:{
        color:"red"
    },
    field: {
        width: "50vw",
        marginBottom: "5%",
        padding: "1vh",
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1
    },
    login: {
        fontSize: 20,
        marginBottom: "2%",
        marginTop: "2%"

    },
    registrarme: {
        fontSize: 20,
        marginBottom: "5%",
        color: "lightblue"
    }
});


export default Login

