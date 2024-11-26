import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { auth, db } from "../firebase/config";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      loading: false,
      errorMessage: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("HomeMenu");
      }
    });
  }

  register() {
    const { email, password, username } = this.state;

    if (!email || !password || !username) {
      this.setState({ errorMessage: "Todos los campos son obligatorios." });
      return;
    }
    if (!email.includes("@")) {
      this.setState({ errorMessage: "El email debe ser válido." });
      return;
    }
    if (password.length < 6) {
      this.setState({
        errorMessage: "La contraseña debe tener al menos 6 caracteres.",
      });
      return;
    }

    this.setState({ loading: true, errorMessage: "" });
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection("users").add({
          email,
          username,
          createdAt: Date.now(),
        });
        this.props.navigation.navigate("HomeMenu");
      })
      .catch((error) => {
        let message = "Ocurrió un error. Intenta de nuevo.";
        if (error.code === "auth/email-already-in-use") {
          message = "El email ya está en uso.";
        } else if (error.code === "auth/invalid-email") {
          message = "El email no es válido.";
        }
        this.setState({ errorMessage: message, loading: false });
      });
  }

  render() {
    const { email, password, username, loading, errorMessage } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Crear Cuenta</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => this.setState({ email: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          value={username}
          onChangeText={(text) => this.setState({ username: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={(text) => this.setState({ password: text })}
        />

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity
          style={[
            styles.button,
            !email || !password || !username ? styles.buttonDisabled : null,
          ]}
          disabled={!email || !password || !username || loading}
          onPress={() => this.register()}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Registrar</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.loginText}>
          ¿Ya tienes cuenta?{" "}
          <Text
            style={styles.loginLink}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            Inicia sesión
          </Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F8FA",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "90%",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#FFF",
    marginBottom: 15,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FF5A5F",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#AAB8C2",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
  loginLink: {
    color: "#FF5A5F",
    fontWeight: "bold",
  },
});

export default Register;
