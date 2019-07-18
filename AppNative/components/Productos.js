import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, ListView, TouchableHighlight, Text, Picker } from 'react-native'
import { List, Divider, FAB, TextInput, Snackbar, ActivityIndicator } from 'react-native-paper'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { trackPromise } from "react-promise-tracker";
import Loading from './Loading'
import SmallLoading from './SmallLoading'
import 'prop-types';

export class Productos extends Component {

    state = {
        listViewData: Array(20).fill('').map((_, i) => `item #${i}`),
        productos: [],
        productosLista: [],
        crearProducto: true,
        mostrarMensaje: false,
        mensaje: '',
        rubros: [],
        subrubros: [],
        rubroSeleccionado: '',
        subrubroSeleccionado: '',
        subrubrosLista: [],
        cargandoSubrubros: true
    }

    constructor(props) {
        super(props);
        this.state.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    }

    componentDidMount() {
        this.cargarRubros();
        this.cargarSubRubros();
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
            //this.cargarRubros()
            //this.cargarSubRubros()
            //this.handleRubroSelect('Aderezos')
            // this.handleSubrubroSelect('Mayonesa')
            // this.cargarProductos('Mayonesa');
        });
    }

    mostrarMensaje = (mensaje) => {
        this.setState({
            mensaje: mensaje,
            mostrarMensaje: true
        })
    }

    cargarRubros = () => {
        trackPromise(fetch('http://10.0.2.2:8080/tpo/rubros')
            .then((res) => res.json()).then((json) => {
                this.setState({
                    rubros: json
                });

            }).catch((error) => {
                alert("Error en API. Metodo getRubros" + error);
            })
            , 'rubros')
    }

    cargarSubRubros = () => {
        fetch('http://10.0.2.2:8080/tpo/sub-rubros/')
            .then((res) => res.json()).then((json) => {
                this.setState({
                    subrubros: json
                });
            }).catch((error) => {
                alert("Error en API. Metodo getSubRubros" + error);
            });
    }

    eliminarProducto = (productoAux) => {
        //alert(productoAux.subRubro.descripcion);
        const url = 'http://10.0.2.2:8080/tpo/productos/';
        fetch(url,
            {
                method: 'DELETE',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: (JSON.stringify(productoAux))
            })
            .then((res) => {
                if (res.ok) {
                    this.mostrarMensaje('Producto eliminado correctamente.')
                    this.cargarProductos();
                }
                else {
                    this.mostrarMensaje('El producto no se pudo eliminar')
                }
            });
    }

    modificarProducto = (identificador) => {
        this.props.navigation.navigate('Producto', { identificador: identificador })
    }

    nuevoProducto = () => {
        this.props.navigation.navigate('AltaProducto')
    }

    handleRubroSelect = (rubro) => {
        this.setState({ rubroSeleccionado: rubro })
        this.setState({ subrubrosLista: this.state.subrubros.filter((subrubro) => rubro == subrubro.rubro.descripcion) })
        this.setState({ productosLista: [] })
    }

    handleSubrubroSelect = (subrubro) => {
        this.setState({ subrubroSeleccionado: subrubro })
        this.setState({ cargandoSubrubros: false })
        this.cargarProductos(subrubro)
    }

    cargarProductos = (subrubro) => {
        let subrubroaux = this.state.subrubros.filter((sr) => subrubro == sr.descripcion)
        trackPromise(fetch('http://10.0.2.2:8080/tpo/productos/subrubro?codigoSubRubro=' + subrubroaux[0].codigo)
            .then((res) => res.json()).then((json) => {
                this.setState({
                    productosLista: json
                });
            }).catch((error) => {
                alert("Error en API" + error);
            })
            , 'productos')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Picker
                            selectedValue={this.state.rubroSeleccionado}
                            style={styles.pickers}
                            onValueChange={(itemValue) => this.handleRubroSelect(itemValue)}
                        >
                            {this.state.rubros.map((rubro) =>
                                <Picker.Item
                                    label={rubro.descripcion}
                                    value={rubro.descripcion}
                                />
                            )}
                        </Picker>
                        <SmallLoading area='rubros' />
                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Picker
                            selectedValue={this.state.subrubroSeleccionado}
                            style={styles.pickers}
                            onValueChange={(itemValue) => this.handleSubrubroSelect(itemValue)}
                        >
                            {this.state.subrubrosLista.map((subrubro) =>
                                <Picker.Item
                                    label={subrubro.descripcion}
                                    value={subrubro.descripcion}
                                />
                            )}
                        </Picker>
                        {this.state.cargandoSubrubros === true ?
                            <ActivityIndicator 
                                animating={this.state.cargandoSubrubros} 
                                size='small' 
                                color='royalblue'
                            />
                        : null
                        }
                    </View>
                </View>
                <Loading area='productos' />
                <SwipeListView
                    dataSource={this.state.ds.cloneWithRows(this.state.productosLista)}
                    renderRow={(producto, rowId) => (
                        <SwipeRow
                            disableRightSwipe={true}
                            leftOpenValue={20 + Math.random() * 225}
                            rightOpenValue={-160}
                        >
                            <View style={styles.rowBack}>
                                <TouchableOpacity
                                    style={[styles.backRightBtn, styles.backRightBtnCenter]}
                                    onPress={this.modificarProducto.bind(this, producto.identificador)}
                                >
                                    <View style={styles.icons}>
                                        <Icon name="md-build" color="white" size={40} />
                                        <Text style={styles.iconText}>Modificar</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                                    onPress={this.eliminarProducto.bind(this, producto)}
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
                                        key={producto.identificador}
                                        titleStyle={styles.listaProductos}
                                        descriptionStyle={styles.listaProductos}
                                        title={producto.nombre}
                                        description={
                                            "Marca: " + producto.marca +
                                            "\nCodigo: " + producto.codigoBarras
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

                <FAB
                    style={styles.fab}
                    small
                    icon="add"
                    color="white"
                    onPress={this.nuevoProducto}
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
    listaProductos: {
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
    },
    pickers: {
        height: 50,
        width: '90%',
        marginBottom: 10
    }
})

export default Productos
