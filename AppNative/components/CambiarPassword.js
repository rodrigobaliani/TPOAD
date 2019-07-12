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
        password: '',
        mensaje: '',
        mostrarMensaje: ''
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
        .then(response => {
            if(!response.ok)
            {
                return response.json()
                .then(({message}) => {
                    this.mostrarMensaje(message)
                });
            }
            else {
                alert('Contraseña cambiada correctamente')
                this.props.navigation.navigate('App')
            }
        })
    }

    mostrarMensaje = (mensaje) => {
        this.setState({
            mensaje: mensaje,
            mostrarMensaje: true
        })
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
                <Snackbar
                    visible={this.state.mostrarMensaje}
                    onDismiss={() => { this.setState({ mostrarMensaje: false }) }}
                    action={{
                        label: 'OK',
                        onPress: () => { this.setState({ mostrarMensaje: false }) }
                    }}
                >
                    {this.state.mensaje}
                </Snackbar>
            </View>
        )
    }
}

export default CambiarPassword