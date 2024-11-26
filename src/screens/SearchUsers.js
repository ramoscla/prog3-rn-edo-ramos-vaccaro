import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator} from "react-native";
import { auth, db } from "../firebase/config";
import { FlatList } from "react-native-web";

class SearchUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchUser: "",
      users: [],
      loading: false,
    };
  }

  handleSearch(item) {
    this.setState({ searchUser: item, loading: true });

    if (item.trim() === "") {
      this.setState({ users: [], loading: false });
      return;
    }

    db.collection("users")
      .where("username", ">=", item)
      .where("username", "<=", item + "\uf8ff")
      .get()
      .then((docs) => {
        let users = [];
        docs.forEach((doc) => {
          users.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          users: users,
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ users: [], loading: false });
      });
  }

  render() {
    return (
      <View style ={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar usuarios..."
          value={this.state.searchUser}
          onChangeText={(item) => this.handleSearch(item)}
        />

        {this.state.loading ? (
          <ActivityIndicator />
        ) : this.state.users.length === 0 &&
          this.state.searchUser.trim() !== "" ? (
          <Text style={styles.noUsersText}>El usuario que buscas no existe</Text>
        ) : (
          <FlatList
            data={this.state.users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.usernameText} >{item.data.username}</Text>
                <Text style={styles.emailText}>{item.data.email}</Text>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f8fa',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  noUsersText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  usernameText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  emailText: {
    fontSize: 14,
    color: 'gray',
  },
});


export default SearchUsers;
