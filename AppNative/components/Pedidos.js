import React, { Component } from 'react'
import { View, TouchableOpacity, ScrollView, StyleSheet, ListView, TouchableHighlight, Text } from 'react-native'
import { List, Divider, FAB, TextInput } from 'react-native-paper'
import { NavigationEvents } from "react-navigation";
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import 'prop-types';



export class Pedidos extends Component {

    constructor(props) {
        super(props);
        this.state.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    }

    state = {
        pedidos: [],
        crearPedido: false,
        cuit: '',
        listViewData: Array(20).fill('').map((_, i) => `item #${i}`),
        ds: []
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

    mostrarInputCuit = () => {
        this.setState({ crearPedido: true })
    }

    ocultarInputCuit = () => {
        this.setState({ crearPedido: false })
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
                        });
                } else
                    alert(responseData.message)
            });
        this.setState({
            crearPedido: false,
            cuit: ''
        })
    }

    facturarPedido = (numeroPedido, estado) => {
        if (estado == 'facturado')
            alert('Este pedido ya está facturado.')
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
                    } else {
                        const responseData = res.json()
                        alert(responseData.message)
                    }
                })
        }
    }

    eliminarPedido = (numeroPedido, estado) => {
        if (estado == 'facturado')
            alert('No se puede eliminar un pedido ya facturado.')
        else {
            const url = 'http://10.0.2.2:8080/tpo/pedidos/' + numeroPedido;
            fetch(url, { method: 'DELETE' })
                .then((res) => {
                    if (res.ok) {
                        this.setState({ pedidos: [...this.state.pedidos.filter(pedido => pedido.numeroPedido != numeroPedido)] })
                    }
                });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <ScrollView>
                    {this.state.pedidos.map((pedido) =>
                        <View>
                            <TouchableOpacity>
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
                            </TouchableOpacity>
                            <Divider />
                        </View>
                    )}
                </ScrollView>*/
                }
                <SwipeListView
                    dataSource={this.state.ds.cloneWithRows(this.state.pedidos)}
                    renderRow={(pedido, rowId) => (
                        <SwipeRow
                            disableLeftSwipe={parseInt(rowId) % 2 === 0}
                            leftOpenValue={20 + Math.random() * 150}
                            rightOpenValue={-150}
                        >
                            <View style={styles.rowBack}>
                                <TouchableOpacity>
                                    <View style={styles.icons}>
                                        <Icon name="md-list" color="white" size={40} />
                                        <Text style={styles.iconText}>Items</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.backRightBtn, styles.backRightBtnLeft]}
                                    onPress={this.facturarPedido.bind(this, pedido.numeroPedido, pedido.estado)}
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
                                        <Icon name="md-trash" color="white" size={40} />
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
                        onPress={this.mostrarInputCuit}
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
                <NavigationEvents onDidBlur={this.ocultarInputCuit} />

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
        backgroundColor: 'royalblue'
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
    },
    backRightBtnLeft: {
        right: 75,
    },
    backRightBtnRight: {
        right: 0,
    },
    backLeftBtn: {
        left: 0,
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
