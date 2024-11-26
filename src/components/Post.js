import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";
import AntDesign from "@expo/vector-icons/AntDesign";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      owner: false,
      amountLikes: this.props.postInfo.data.likes.length,
    };
  }

  componentDidMount() {
    if (
      auth.currentUser &&
      this.props.postInfo.data.likes.includes(auth.currentUser.email)
    ) {
      this.setState({
        liked: true,
        amountLikes: this.props.postInfo.data.likes.length,
      });
    }
    if (
      auth.currentUser &&
      this.props.postInfo.data.owner.includes(auth.currentUser.email)
    ) {
      this.setState({
        owner: true,
      });
    }
  }

  like() {
    db.collection("posts")
      .doc(this.props.postInfo.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => {
        this.setState({
          liked: true,
          amountLikes: this.props.postInfo.data.likes.length + 1,
        });
      });
  }

  dislike() {
    db.collection("posts")
      .doc(this.props.postInfo.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then(() => {
        this.setState({
          liked: false,
          amountLikes: this.props.postInfo.data.likes.length - 1,
        });
      });
  }

  deletePost = (id) => {
    db.collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Post eliminado");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.ownerText}>{this.props.postInfo.data.owner}</Text>
        <Text style={styles.dateText}>
          {new Date(this.props.postInfo.data.createdAt).toLocaleString()}
        </Text>
        <Text style={styles.descriptionText}>
          {this.props.postInfo.data.description}
        </Text>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={() => (this.state.liked ? this.dislike() : this.like())}
          >
            <AntDesign
              name={this.state.liked ? "heart" : "hearto"}
              size={24}
              color={this.state.liked ? "red" : "black"}
            />
          </TouchableOpacity>
          <Text style={styles.likesCount}>{this.state.amountLikes}</Text>
          {this.state.owner && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => this.deletePost(this.props.postInfo.id)}
            >
              <AntDesign name="delete" size={22} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: 10,
  },
  ownerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  dateText: {
    fontSize: 12,
    color: "#888",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likesCount: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    marginLeft: "auto",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 12,
  },
});

export default Post;
