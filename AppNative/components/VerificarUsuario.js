import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput, Snackbar, Button } from 'react-native-paper'
import 'prop-types';

export class VerificarUsuario extends Component {

    state = {
        username: '',
        password: '',
        mensaje: '',
        mostrarMensaje: ''
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
                    this.mostrarMensaje(json.message)
                }
            }
            );
    }

    handleSuccessfulLogin = () => {
        this.props.navigation.navigate('CambiarPassword', { username: this.state.username, password: this.state.password })
    }

    mostrarMensaje = (mensaje) => {
        this.setState({
            mensaje: mensaje,
            mostrarMensaje: true
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}    
                    label='Usuario'
                    value={this.state.username}
                    onChangeText={username => this.setState({ username })}
                    keyboardType='default'
                />

                <TextInput
                    style={styles.input}
                    label='Password'
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    textContentType='password'
                    secureTextEntry={true}
                />
                <Button
                    style={styles.buttons}
                    mode="contained"
                    title="Cambiar Contraseña"
                    onPress={() => this.autenticar()}>
                    Acceder
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



export default VerificarUsuario