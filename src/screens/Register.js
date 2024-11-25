import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/config';



class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            registered: false,
            errorMessage: ' ',
            error: false
        };
    }

    componentDidMount() {
       
        auth.onAuthStateChanged(user => {
           if (user){
            this.props.navigation.navigate("HomeMenu")
           }
        })
    }

    register(email, pass, user) {
        if (user == "") {
            this.setState({ errorMessage: 'El campo username es obligatorio' });
            console.log(this.state.errorMessage)
            this.setState({ error: true })

        }
        
        if (pass.length < 6) {
            this.setState({ errorMessage: 'La contraseña debe tener al menos 6 caracteres' });
            console.log(this.state.errorMessage)
            this.setState({ error: true })
        }

        if (email.includes("@") == false) {
            this.setState({ errorMessage: 'El campo email es obligatorio' });
            console.log(this.state.errorMessage)
            this.setState({ error: true }) 
        }

    
        if (!this.state.error) {
        auth.createUserWithEmailAndPassword(email, pass)

            .then(response => {
                this.setState({ registered: true });
                this.setState({ loggedIn: true });
                db.collection('users').add({
                    email: email,
                    username: user,
                    createdAt: Date.now()
                })
                this.props.navigation.navigate("HomeMenu");

            })
            .catch(error => {
                console.log(error)
                if (error.code === 'auth/email-already-in-use') {
                    this.setState({ errorMessage: 'El email ya esta en uso' });
                    console.log(this.state.errorMessage)
                }
                else if (error.code === 'auth/invalid-email') {
                    this.setState({ errorMessage: 'email mal formateado' });
                    console.log(this.state.errorMessage)
                }
                else
                {
                    this.setState({ errorMessage: error.message });
                    console.log(errorMessage)
                }
            }
            );
        
        }

    }



    render() {
            return (
                <View style={styles.container}>
                    <Text style={styles.register}>Crea tu usuario:</Text>
                    <Text style={styles.campoObli}>* Campo obligatorio</Text>

                    <View>
                        <Text style={styles.obligatorio}>*</Text>
                        <TextInput style={styles.field}
                            keyboardType='email-address'
                            placeholder='email'
                            onChangeText={text => this.setState({ email: text })}
                            value={this.state.email}
                        />
                    </View>

                    <View>
                        <Text style={styles.obligatorio}>*</Text>
                        <TextInput style={styles.field}
                            keyboardType='default'
                            placeholder='username'
                            onChangeText={text => this.setState({ username: text })}
                            value={this.state.username}
                        />
                    </View>

                    <View>
                        <Text style={styles.obligatorio}>*</Text>
                        <TextInput style={styles.field}
                            keyboardType='default'
                            placeholder='password'
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ password: text })}
                            value={this.state.password}
                        />
                    </View>
                    <Text>{this.state.errorMessage}</Text>
                    <TouchableOpacity onPress={() => this.register(this.state.email, this.state.password, this.state.username)}>
                        <Text style={((this.state.password && this.state.email && this.state.username) ? styles.boton : styles.botonDisabled)
                        }> Crear usuario </Text>
                    </TouchableOpacity>
                    <Text style={styles.register}>¿Ya tenes usuario?</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("Login")}>
                        <Text style={styles.login}>Login</Text>
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
        marginBottom: "3%"

    },
    login: {
        fontSize: 20,
        marginBottom: "5%",
        color: "lightblue"
    },
    field: {
        width: "50vw",
        padding: "1vh",
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        marginBottom: "3%",

    },
    register: {
        fontSize: 20,
        marginBottom: "3%",
        marginTop: "3%"

    },
    obligatorio: {
        fontSize: 10,
        marginTop: "0%",
        color: "red",
        alignSelf: "flex-end"
    },
    campoObli: {
        color: "red",
        marginBottom: "3%"
    },
    botonDisabled: {
        display: "none"
    }


});

export default Register

