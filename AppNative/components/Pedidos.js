import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native'
import { List, Divider } from 'react-native-paper'



export class Pedidos extends Component {

    state = {
        pedidos: []
    }

    componentDidMount() {
        this.cargarPedidos()

    }

    cargarPedidos = () => {
        fetch('http://10.0.2.2:8080/tpo/pedidos/')
            .then((res) => res.json()).then((json) => {
                this.setState({
                    pedidos: json
                });

            }).catch((error) => {
                alert("Error en carga de pedidos:" + error);
            })
    }

    render() {
        return (
            <ScrollView>
                {this.state.pedidos.map( (pedido) => 
                    <List.Item 
                        key = {pedido.numeroPedido}
                        title = {"Pedido "+pedido.numeroPedido}
                        description = {"Cuit: "+pedido.cliente.cuil}
                    /> 
                )}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    }
})

export default Pedidos
