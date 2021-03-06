import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, TextInput, Snackbar } from 'react-native-paper'

export class Login extends Component {
    state = {
        username: '',
        password: '',
        cambioPass: false,
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
                }
                else {
                    this.mostrarMensaje(json.message)
                }
            }
            );
    }

    handleSuccessfulLogin = () => {
        this.mostrarMensaje("Bienvenido " + this.state.username)
        this.props.navigation.navigate('App', { username: this.state.username })
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
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.username}
                    onChangeText={username => this.setState({ username })}
                    keyboardType='default'
                />

                <TextInput
                    style={styles.input}
                    label='Password'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    textContentType='password'
                    secureTextEntry={true}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        style={styles.buttons}
                        mode="contained"
                        color = '#d32f2f'
                        onPress={() => this.autenticar()}
                    >
                        Ingresar
                    </Button>
                    <Button
                        style={styles.buttons}
                        mode="contained"
                        color = '#d32f2f'
                        onPress={() => this.props.navigation.navigate('CambiarPasswordSinLogin')}
                    >
                        Cambiar Pass
                    </Button>
                </View>
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

export default Login
