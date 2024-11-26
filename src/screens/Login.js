import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { auth } from "../firebase/config";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("HomeMenu");
      }
    });
  }

  login() {
    const { email, password } = this.state;
    if (!email.includes("@")) {
      this.setState({ error: "Ingrese un email válido." });
      return;
    }
    if (password.length < 6) {
      this.setState({ error: "La contraseña debe tener al menos 6 caracteres." });
      return;
    }
    this.setState({ error: "", loading: true });
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate("HomeMenu");
      })
      .catch(() => {
        this.setState({ error: "Credenciales incorrectas.", loading: false });
      });
  }

  render() {
    const { email, password, error, loading } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Correo electrónico"
          value={email}
          onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={(text) => this.setState({ password: text })}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity
          style={[styles.button, !email || !password ? styles.buttonDisabled : null]}
          disabled={!email || !password || loading}
          onPress={() => this.login()}
        >
          <Text style={styles.buttonText}>
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          ¿No tienes cuenta?{" "}
          <Text style={styles.linkText} onPress={() => this.props.navigation.navigate("Register")}>
            Regístrate
          </Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F5F8FA",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  button: {
    backgroundColor: "#FF5A5F",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#AAB8C2",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  loginText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#555",
  },
  linkText: {
    color: "##FF5A5F",
    fontWeight: "bold",
  },
});

export default Login;
