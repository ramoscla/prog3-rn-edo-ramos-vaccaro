import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Component } from "react";
import { auth } from "../firebase/config";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import NewPost from "../screens/NewPost";
import SearchUsers from "../screens/SearchUsers";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


const Tab = createBottomTabNavigator();

class HomeMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.props.navigation.navigate("Login");
      }
    });
  }

  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="face-man-profile"
                size={24}
                color="black"
              />
            ),
          }}
        />
        <Tab.Screen
          name="New Post"
          component={NewPost}
          options={{
            tabBarIcon: () => (
              <AntDesign name="pluscircleo" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Search Users"
          component={SearchUsers}
          options={{
            tabBarIcon: () => (
              <AntDesign name="search1" size={24} color="black" />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default HomeMenu;
