import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, ListView, TouchableHighlight, Text, Picker } from 'react-native'
import { List, Divider, FAB, TextInput, Snackbar, Button } from 'react-native-paper'
import { NavigationEvents } from "react-navigation";
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import 'prop-types';

export class Usuario extends Component {

    state = {
        username: '',
        password: ''
    }

    autenticar = () => {
        const usuario = this.state.username
        const password = this.state.password
        const url = 'http://10.0.2.2:8080/tpo/login?user=' + usuario + '&password=' + password;
        fetch(url)
            .then((res) => res.json()).then((json) => {
                if (json == true) {
                    this.handleSuccessfulLogin();
                } else {
                    alert(json.message)
                }
            }
            );
    }

    handleSuccessfulLogin = () => {
        this.props.navigation.navigate('CambiarPassword', { username: this.state.username, password: this.state.password })
    }


    render() {
        return (
            <View style={{ flex: 5, justifyContent: 'center' }}>
                <TextInput
                    label='Usuario'
                    value={this.state.username}
                    onChangeText={username => this.setState({ username })}
                    keyboardType='default'
                />

                <TextInput
                    label='Password'
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    textContentType='password'
                    secureTextEntry={true}
                />
                <Button
                    mode="contained"
                    title="Cambiar Contraseña"
                    onPress={() => this.autenticar()}>
                    Acceder
    
                </Button>
            </View>
        )
    }
}


export default Usuario