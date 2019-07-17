import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput, Snackbar, Button } from 'react-native-paper'
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
            <View style = {styles.container}>
                <TextInput
                    style = {styles.input}
                    label='Ingrese nueva contraseña'
                    value={this.state.newPassword}
                    onChangeText={newPassword => this.setState({ newPassword })}
                    keyboardType='default'
                    textContentType = 'password'
                    secureTextEntry={true}
                />

                <TextInput
                    style = {styles.input}
                    label='Ingrese nuevamente la contraseña'
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    keyboardType='default'
                    textContentType = 'password'
                    secureTextEntry={true}
                />

                <Button 
                    style = {styles.buttons}
                    onPress={this.verificarPassword} 
                    mode="contained" >
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '90%',
        height: 50,
        marginBottom: 10,
    },
    buttons: {
        width: '45%',
        height: 50,
        padding: 10,
        marginBottom: 10,
    },
})

export default CambiarPassword