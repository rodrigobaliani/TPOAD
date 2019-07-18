import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, ListView, TouchableHighlight, Text } from 'react-native'
import { List, Divider, FAB, TextInput, Snackbar, ActivityIndicator } from 'react-native-paper'
import { NavigationEvents } from "react-navigation";
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from './Loading'
import {trackPromise} from "react-promise-tracker";
import 'prop-types';



export class Pedidos extends Component {

    state = {
        pedidos: [],
        crearPedido: false,
        cuit: '',
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
        const noCuitCode = 'NO-CUIT';
        const { navigation } = this.props;
        const cuit = navigation.getParam('cuitCliente', noCuitCode);
        (cuit != noCuitCode) ? this.cargarPedidosByCliente(cuit) : this.cargarPedidos();
    }

    cargarPedidos = () => {
        trackPromise(
            fetch('http://10.0.2.2:8080/tpo/pedidos/')
                .then((res) => res.json()).then((json) => {
                    this.setState({
                        pedidos: json
                    });

                }).catch((error) => {
                    alert("Error en carga de pedidos:" + error)
                })
        )
    }

    cargarPedidosByCliente = (cuit) => {
        const url = 'http://10.0.2.2:8080/tpo/pedidos/pedidos-by-cliente?cuit=' + cuit;
        fetch(url)
            .then((res) => res.json()).then((json) => {
            this.setState({
                pedidos: json
            });

        }).catch((error) => {
            alert("Error en cargar pedidos by cliente" + error);
        })
    }

    crearPedido = () => {
        const send = 'http://10.0.2.2:8080/tpo/pedidos/crear-con-cuit?cuit=' + this.state.cuit;
        fetch(send)
            .then((res) => res.json()).then((responseData) => {
                console.log(responseData)
                if (Number.isInteger(responseData)) {
                    const url = 'http://10.0.2.2:8080/tpo/pedidos/byId?numero='
                    const send = url + responseData
                    fetch(send)
                        .then((res) => res.json()).then((responseData) => {
                            this.setState({ pedidos: [...this.state.pedidos, responseData] })
                            this.mostrarMensaje('Pedido creado correctamente.')
                        });
                } else
                    alert(responseData.message)
            });
        this.setState({
            crearPedido: false,
            cuit: ''
        })
    }


    facturarPedido = (numeroPedido, estado, cantItems) => {
        if (estado == 'facturado')
            this.mostrarMensaje('No se puede facturar un pedido ya facturado.')
        else {
            if (cantItems == 0)
                this.mostrarMensaje('No se puede facturar un pedido sin items.')
            else {
                const url = 'http://10.0.2.2:8080/tpo/pedidos/facturar?numero=' + numeroPedido
                fetch(url)
                    .then((res) => {
                        if (res.ok) {
                            this.setState({
                                pedidos: this.state.pedidos.map((pedido) => {
                                    if (pedido.numeroPedido == numeroPedido)
                                        pedido.estado = 'facturado'
                                    return pedido
                                })
                            })
                            this.mostrarMensaje('El pedido ' + numeroPedido + ' ha sido facturado.')
                        } else {
                            const responseData = res.json()
                            alert(responseData.message)
                        }
                    })
            }
        }
    }

    eliminarPedido = (numeroPedido, estado) => {
        if (estado == 'facturado')
            this.mostrarMensaje('No se puede facturar un pedido ya facturado.')
        else {
            const url = 'http://10.0.2.2:8080/tpo/pedidos/' + numeroPedido;
            fetch(url, { method: 'DELETE' })
                .then((res) => {
                    if (res.ok) {
                        this.setState({ pedidos: [...this.state.pedidos.filter(pedido => pedido.numeroPedido != numeroPedido)] })
                        this.mostrarMensaje('Pedido eliminado correctamente.')
                    }
                });
        }
    }

    mostrarDetallePedido = (numeroPedido) => {
        this.props.navigation.navigate('Pedido', { numeroPedido: numeroPedido })
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
                <Loading/>
                <SwipeListView
                    enableEmptySections={true}
                    dataSource={this.state.ds.cloneWithRows(this.state.pedidos)}
                    renderRow={(pedido, rowId) => (
                        <SwipeRow
                            disableRightSwipe={true}
                            leftOpenValue={20 + Math.random() * 225}
                            rightOpenValue={-225}
                        >
                            <View style={styles.rowBack}>
                                <TouchableOpacity
                                    style={[styles.backRightBtn, styles.backRightBtnLeft]}
                                    onPress={this.mostrarDetallePedido.bind(this, pedido.numeroPedido)}
                                >
                                    <View style={styles.icons}>
                                        <Icon name="md-list" color="white" size={40} />
                                        <Text style={styles.iconText}>Items</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.backRightBtn, styles.backRightBtnCenter]}
                                    onPress={this.facturarPedido.bind(this, pedido.numeroPedido, pedido.estado, pedido.items.lenght)}
                                >
                                    <View style={styles.icons}>
                                        <Icon name="md-cash" color='white' size={40} />
                                        <Text style={styles.iconText}>Facturar</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                                    onPress={this.eliminarPedido.bind(this, pedido.numeroPedido, pedido.estado)}
                                >
                                    <View style={styles.icons}>
                                        <Icon
                                            name="md-trash" color="white" size={40} />
                                        <Text style={styles.iconText}>Eliminar</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableHighlight style={styles.rowFront}>
                                <View>
                                    <List.Item
                                        key={pedido.numeroPedido}
                                        titleStyle={styles.listaPedidos}
                                        descriptionStyle={styles.listaPedidos}
                                        title={"Pedido " + pedido.numeroPedido}
                                        description={
                                            "Cuit: " + pedido.cliente.cuil +
                                            "\nEstado: " + pedido.estado 
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
                {!this.state.crearPedido ?
                    <FAB
                        style={styles.fab}
                        small
                        icon="add"
                        color="white"
                        onPress={() => this.setState({ crearPedido: true })}
                    />
                    : null}
                {this.state.crearPedido ?
                    <TextInput
                        style={styles.textInput}
                        value={this.state.cuit}
                        placeholder='Ingrese un CUIT para crear un pedido...'
                        onChangeText={cuit => this.setState({ cuit })}
                        onSubmitEditing={this.crearPedido}
                    />
                    : null}
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
                <NavigationEvents onDidBlur={() => this.setState({ crearPedido: false })} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    listaPedidos: {
        textAlign: 'center',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#d32f2f'
    },
    textInput: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%'
    },
    rowFront: {
        backgroundColor: 'snow',
        justifyContent: 'center',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#d32f2f',
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
    },
    backRightBtnLeft: {
        right: 150,
    },
    backRightBtnCenter: {
        right: 75,
    },
    backRightBtnRight: {
        right: 0,
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

export default Pedidos
