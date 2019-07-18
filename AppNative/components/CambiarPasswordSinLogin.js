import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Button, Snackbar } from 'react-native-paper'
import 'prop-types';

export class CambiarPasswordSinLogin extends Component {

    state = {
        username: '',
        currentPassword: '',
        newPassword: '',
        password: '',
        mensaje: '',
        mostrarMensaje: ''
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
        const usuario = this.state.username
        const password = this.state.currentPassword
        const url = 'http://10.0.2.2:8080/tpo/login?user=' + usuario + '&password=' + password;
        fetch(url)
            .then((res) => res.json()).then((json) => {
                if (json == true) {
                    const url = 'http://10.0.2.2:8080/tpo/cambio-password?nombre=' + this.state.username + '&password=' + this.state.password;
                    fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => {
                            if (!response.ok) {
                                return response.json()
                                    .then(({ message }) => {
                                        this.mostrarMensaje(message)
                                    });
                            }
                            else {
                                alert('Contraseña cambiada correctamente')
                                this.props.navigation.navigate('Login')
                            }
                        })
                }
                else {
                    this.mostrarMensaje('Verifique su usuario y/o contraseña.')
                }
            }
            );
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

                <Text> Cambiar Contraseña </Text>

                <TextInput
                    style={styles.input}
                    label='Usuario'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.username}
                    onChangeText={username => this.setState({ username })}
                    keyboardType='default'
                />

                <TextInput
                    style={styles.input}
                    label='Ingrese su contraseña actual'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.currentPassword}
                    onChangeText={currentPassword => this.setState({ currentPassword })}
                    keyboardType='default'
                    textContentType='password'
                    secureTextEntry={true}
                />


                <TextInput
                    style={styles.input}
                    label='Ingrese su nueva contraseña'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.newPassword}
                    onChangeText={newPassword => this.setState({ newPassword })}
                    keyboardType='default'
                    textContentType='password'
                    secureTextEntry={true}
                />

                <TextInput
                    style={styles.input}
                    label='Ingrese nuevamente la contraseña'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    keyboardType='default'
                    textContentType='password'
                    secureTextEntry={true}
                />

                <Button
                    style={styles.buttons}
                    color = '#d32f2f'
                    onPress={this.verificarPassword}
                    mode="contained" >
                    Cambiar Pass
                </Button>
                <Button
                    style={styles.buttons}
                    color = '#d32f2f'
                    onPress={() => this.props.navigation.navigate('Login')}
                    mode="contained" >
                    Volver
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

export default CambiarPasswordSinLogin
