import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            
            
        };
    }
    



    render(){
        return(
            <View>
                <Text> Post </Text>
            </View>
        )
        
           
    }

}

export default Post;