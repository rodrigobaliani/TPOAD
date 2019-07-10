import React, { Component } from 'react'
import { Button, View } from 'react-native'
import { List, Divider, FAB, TextInput, Snackbar} from 'react-native-paper'

export class Login extends Component {
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
                    alert("Datos Incorrectos. Vuelva a intentarlo")
                }
            }
        );
    }
    
    handleSuccessfulLogin = () => {
        alert("Bienvenido " + this.state.username)
        this.props.navigation.navigate('App')
    }
    
    
    render() {
        return (
            <View style={{ flex: 5, justifyContent: 'center'}}>
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
                    textContentType = 'password'
                    secureTextEntry={true}
                />


                <Button
                    title="Ingresar"
                    onPress={() => this.handleSuccessfulLogin()}
                />
            </View>
        )
    }
}

export default Login
