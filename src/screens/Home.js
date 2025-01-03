import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacit,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { auth, db } from "../firebase/config";
import { FlatList } from "react-native-web";
import Post from "../components/Post";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }
  componentDidMount() {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
        let arrDocs = [];
        docs.forEach((doc) => {
          arrDocs.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          posts: arrDocs,
          loading: false,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="red" />
        ) : this.state.posts.length === 0 ? (
          <Text>No hay posts aún</Text>
        ) : (
          <FlatList
            data={this.state.posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Post postInfo={item} />}
            style={{ flex: 1 }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
  },
});

export default Home;
