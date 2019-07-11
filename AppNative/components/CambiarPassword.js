import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, ListView, TouchableHighlight, Text, Picker } from 'react-native'
import { List, Divider, FAB, TextInput, Snackbar, Button } from 'react-native-paper'
import { NavigationEvents } from "react-navigation";
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import 'prop-types';

export class CambiarPassword extends Component {

    state = {
        username: '',
        newPassword: '',
        password: ''
    }

    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        const { navigation } = this.props;
        const usernameAux = navigation.getParam('username', 'NO-ID');
        this.setState({ username: usernameAux });
    }

    verificarPassword = () => {
        if(this.state.password == this.state.newPassword){
            this.cambiarPassword();
        }
        else
        {
            alert("Las contraseñas ingresadas no son iguales");
        }
    }

    cambiarPassword = () => {
        const url = 'http://10.0.2.2:8080/tpo/cambio-password?nombre=' + this.state.username + '&password=' + this.state.password;
        fetch(url, {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.ok)
            {
                alert('La contraseña fue cambiada con éxito')
            }  
            else
            {
                alert("Error: No se pudo cambiar la contraseña")
            }
          });
    }

    render() {
        return (
            <View>
                <Text> USUARIO  {this.state.username}</Text>

                <Text> Cambiar Contraseña </Text>

                <TextInput
                    label='Ingrese nueva contraseña'
                    value={this.state.newPassword}
                    onChangeText={newPassword => this.setState({ newPassword })}
                    keyboardType='default'
                    textContentType = 'password'
                    secureTextEntry={true}
                />

                <TextInput
                    label='Ingrese nuevamente la contraseña'
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    keyboardType='default'
                    textContentType = 'password'
                    secureTextEntry={true}
                />

                <Button onPress={this.verificarPassword} icon="add-circle-outline" mode="contained" >
                    Cambiar Contraseña
                </Button>
            </View>
        )
    }
}

export default CambiarPassword