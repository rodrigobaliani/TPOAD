import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, ListView, TouchableHighlight, Text } from 'react-native'
import { List, Divider, Snackbar } from 'react-native-paper'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from './Loading'
import {trackPromise} from "react-promise-tracker";

export class Clientes extends Component {

    state = {
        clientes: [],
        listViewData: Array(20).fill('').map((_, i) => `item #${i}`),
        ds: [],
        mostrarMensaje: false,
        mensaje: ''
    }

    constructor(props) {
        super(props);
        this.state.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    }

    componentDidMount() {        
        this.cargarClientes();
    }

    cargarClientes = () => {
        fetch('http://10.0.2.2:8080/tpo/clientes')
            .then((response) => response.json()).then((json) => {
            this.setState({
                clientes: json
            });
        }).catch((error) => {
            alert("Error al cargar clientes" + error);
        })
    }

    goToPedidosCliente(cuit) {
        this.props.navigation.push('Pedidos', { cuitCliente: cuit })
    }

    mostrarMensaje = (mensaje) => {
        this.setState({
            mensaje: mensaje,
            mostrarMensaje: true
        })
    }

    parseBoolean = (value) => {
        return (value) ? 'Sí' : 'No'
    }

    removeWhiteSpace = (str) => {
        return str.trim();
    }


    render() {
        return (
            <View style={styles.container}>
                <Loading/>
                <SwipeListView
                    dataSource={this.state.ds.cloneWithRows(this.state.clientes)}
                    renderRow={(cliente, rowId) => (
                        <SwipeRow
                            disableRightSwipe={true}
                            leftOpenValue={20 + Math.random() * 225}
                            rightOpenValue={-75}
                        >
                            <View style={styles.rowBack}>
                                <TouchableOpacity
                                    style={[styles.backRightBtn]}
                                    onPress={this.goToPedidosCliente.bind(this, cliente.cuil)}
                                >
                                    <View style={styles.icons}>
                                        <Icon name="md-cart" color="white" size={40} />
                                        <Text style={styles.iconText}>Pedidos</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableHighlight style={styles.rowFront}>
                                <View>
                                    <List.Item
                                        key={cliente.numero}
                                        titleStyle={styles.clienteTitle}
                                        descriptionStyle={styles.clienteDescription}
                                        title={"#" + cliente.numero + " " + this.removeWhiteSpace(cliente.nombre)}
                                        description={
                                            "Cuil: " + cliente.cuil +
                                            "\nActivo: " + this.parseBoolean(cliente.activo)
                                        }
                                    />
                                    <Divider />
                                </View>
                            </TouchableHighlight>
                        </SwipeRow>
                    )}
                    leftOpenValue={75}
                    rightOpenValue={-150}

                />
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
        paddingTop: 10,
    },
    clienteTitle: {
        textAlign: 'center',
    },
    clienteDescription: {
        textAlign: 'center',
    },
    rowFront: {
        backgroundColor: 'snow',
        justifyContent: 'center',
        flex: 1,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'dodgerblue',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        right: 0
    },
    icons: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        color: 'white'
    }
})

export default Clientes
