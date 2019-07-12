import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { TextInput, Button, Snackbar } from 'react-native-paper'
import 'prop-types';

export class CambiarPasswordSinLogin extends Component {

    state = {
        username: '',
        newPassword: '',
        password: '',
        mensaje: '',
        mostrarMensaje: ''
    }

    componentDidMount() {

    }

    verificarPassword = () => {
        if (this.state.password == this.state.newPassword) {
            this.cambiarPassword();
        }
        else {
            this.mostrarMensaje("Las contraseñas ingresadas no son iguales");
        }
    }

    cambiarPassword = () => {
        const url = 'http://10.0.2.2:8080/tpo/cambio-password?nombre=' + this.state.username + '&password=' + this.state.password;
        fetch(url, {
            method: 'GET',
            headers: {
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
                this.props.navigation.navigate('Login')
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

                <Text> Cambiar Contraseña </Text>

                <TextInput
                    label='Usuario'
                    value={this.state.username}
                    onChangeText={username => this.setState({ username })}
                    keyboardType='default'
                />

                <TextInput
                    label='Ingrese nueva contraseña'
                    value={this.state.newPassword}
                    onChangeText={newPassword => this.setState({ newPassword })}
                    keyboardType='default'
                    textContentType='password'
                    secureTextEntry={true}
                />

                <TextInput
                    label='Ingrese nuevamente la contraseña'
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    keyboardType='default'
                    textContentType='password'
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

export default CambiarPasswordSinLogin
