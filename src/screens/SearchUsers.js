import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacit, StyleSheet} from 'react-native';
import { auth, db } from '../firebase/config';
import { FlatList } from 'react-native-web';


class SearchUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
          
        };
    }

    componentDidMount(){
        db.collection("users").onSnapshot(
            docs => {
                let users = [];
                docs.forEach(doc => {
                    users.push({
                        id: doc.id,
                        data: doc.data()
        
                    })
                })
                this.setState({
                    users: users
                }), () => console.log("usuarios de la collection: ", this.state.users);
            }
        )
    }


    render() {

            return(
            <View >
                <Text>Usuarios</Text>
                <Text>Lista de usuarios registrados:</Text>
                <FlatList
                data={this.state.users}
                keyExtractor={ item => item.id}
                renderItem={({item}) => 
        
                 <View>
                    <Text>
                        {item.data.email}
                    </Text>
                 </View>}
                
                />


            </View>
        );
    }
}


export default SearchUsers;
               
            