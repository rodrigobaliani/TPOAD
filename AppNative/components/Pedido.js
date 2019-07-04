import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { DataTable, FAB } from 'react-native-paper'
import Loading from './Loading'
import {trackPromise} from "react-promise-tracker";

export class DetallePedido extends Component {

    state = {
        items: [],
        estado: '',
        numeroPedido: ''
    }
    

    componentDidMount() {
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
           this.cargarItems()
         });
    }


      cargarItems = () => {
        const { navigation } = this.props;
        const numeroPedido = navigation.getParam('numeroPedido', 'NO-ID');
        const send = 'http://10.0.2.2:8080/tpo/pedidos/byId?numero=' + numeroPedido
        trackPromise(
            fetch(send)
            .then((res) => res.json()).then((responseData) => {
                this.setState({ items: responseData.items })
                this.setState({ estado: responseData.estado })
                this.setState({ numeroPedido: numeroPedido })
            })
        )
      }


    render() {
        return (
            <View style = {styles.container}>

                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Producto</DataTable.Title>
                        <DataTable.Title numeric>Cantidad</DataTable.Title>
                    </DataTable.Header>
                    <Loading/>
                    <ScrollView>
                    {this.state.items.map((item) =>
                    
                            <DataTable.Row>
                                <DataTable.Cell>{item.producto.nombre}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.cantidad}</DataTable.Cell>
                            </DataTable.Row>
                    )}
                    </ScrollView>
                </DataTable>
                {this.state.estado == 'pendiente'?
                    <FAB
                        style={styles.fab}
                        small
                        icon="add"
                        color="white"
                        onPress = {() => this.props.navigation.navigate('AgregarItem', {numeroPedido: this.state.numeroPedido})}
                    />
                : null }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: 'royalblue'
    },
})

export default DetallePedido
