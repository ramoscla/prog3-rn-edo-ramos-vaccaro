import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import NewPost from '../screens/NewPost';
import SearchUsers from '../screens/SearchUsers';

const Tab = createBottomTabNavigator()

function HomeMenu() {
    return (
        <Tab.Navigator >
            <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: () => <MaterialCommunityIcons name="face-man-profile" size={24} color="black" />}}/>
            <Tab.Screen name="Home" component={Home} options={{tabBarIcon: () => <AntDesign name="home" size={24} color="black" />}}/>
            <Tab.Screen name="New Post" component={NewPost} options={{tabBarIcon: () => <AntDesign name="pluscircleo" size={24} color="black" />}}/>
            <Tab.Screen name = "Search Users" component={SearchUsers} options ={{tabBarIcon:() => <AntDesign name ="search1" size ={24} color = "black" />}} />
        </Tab.Navigator>
    );
}

export default HomeMenu;