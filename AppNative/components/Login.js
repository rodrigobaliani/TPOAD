import React, { Component } from 'react'
import { Button, View } from 'react-native'

export class Login extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    title="Login"
                    onPress={() => this.props.navigation.navigate('App')}
                />
            </View>
        )
    }
}

export default Login
