import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { auth, db } from "../firebase/config";

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descPost: "",
      error: "",
    };
  }

  createPost(descPost) {
    if (!auth.currentUser) {
      this.setState({ error: "Tu usuario no está autenticado" });
      return;
    }
    if (descPost === "") {
      this.setState({
        error: "Ingresa una descripción para poder crear un post",
      });
      return;
    }
    db.collection("posts")
      .add({
        owner: auth.currentUser.email,
        createdAt: Date.now(),
        description: descPost,
        likes: [],
      })
      .then(() => {
        this.setState({ descPost: "", error: "" });
        this.props.navigation.navigate("Home");
      })
      .catch(() => {
        this.setState({
          error: "Hubo un problema al crear el post. Intenta de nuevo.",
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Crear un Nuevo Post ✨</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="¿Qué estás pensando?"
            placeholderTextColor="#888"
            multiline={true}
            value={this.state.descPost}
            onChangeText={(text) => this.setState({ descPost: text })}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.createPost(this.state.descPost)}
          >
            <Text style={styles.buttonText}>Publicar</Text>
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
    backgroundColor: "#F5F8FA",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: "#E1E8ED",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#F8F9FA",
    marginBottom: 20,
    textAlignVertical: "top",
    color: "#333",
  },
  button: {
    backgroundColor: "#FF5A5F",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
});

export default NewPost;
