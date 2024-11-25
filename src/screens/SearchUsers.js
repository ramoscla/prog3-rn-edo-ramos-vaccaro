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
      <View>
        <TextInput
          placeholder="Buscar usuarios..."
          value={this.state.searchUser}
          onChangeText={(item) => this.handleSearch(item)}
        />

        {this.state.loading ? (
          <ActivityIndicator />
        ) : this.state.users.length === 0 &&
          this.state.searchUser.trim() !== "" ? (
          <Text>El usuario que buscas no existe</Text>
        ) : (
          <FlatList
            data={this.state.users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Text>{item.data.username}</Text>
                <Text>{item.data.email}</Text>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}

export default SearchUsers;
