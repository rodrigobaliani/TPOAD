import React, { Component } from 'react'
import { View, Picker, StyleSheet } from 'react-native'
import { TextInput, Snackbar, Button, ActivityIndicator } from 'react-native-paper'
import { trackPromise } from "react-promise-tracker";
import SmallLoading from './SmallLoading'

export class AgregarItem extends Component {

    state = {
        numeroPedido: '',
        rubros: [],
        subrubros: [],
        productos: [],
        subrubrosLista: [],
        productosLista: [],
        rubroSeleccionado: '',
        subrubroSeleccionado: '',
        productoSeleccionado: '',
        cantidad: '',
        mensaje: '',
        mostrarMensaje: false,
        cargandoSubrubros: true,
        agregandoItem: false

    }

    componentDidMount() {
        const { navigation } = this.props;
        const numeroPedido = navigation.getParam('numeroPedido');
        this.setState({ numeroPedido: numeroPedido })
        trackPromise(
            fetch('http://10.0.2.2:8080/tpo/rubros')
                .then((res) => res.json()).then((json) => {
                    this.setState({
                        rubros: json
                    });

                }).catch((error) => {
                    alert("Error en API" + error);
                })
            , 'rubros')
        fetch('http://10.0.2.2:8080/tpo/sub-rubros/')
            .then((res) => res.json()).then((json) => {
                this.setState({
                    subrubros: json
                });
            }).catch((error) => {
                alert("Error en API" + error);
            });
        fetch('http://10.0.2.2:8080/tpo/productos/')
            .then((res) => res.json()).then((json) => {
                this.setState({
                    productos: json
                });
            }).catch((error) => {
                alert("Error en API" + error);
            });
    }


    handleRubroSelect = (rubro) => {
        this.setState({ cargandoSubrubros: true })
        this.setState({ rubroSeleccionado: rubro })
        this.setState({ subrubrosLista: this.state.subrubros.filter((subrubro) => rubro == subrubro.rubro.descripcion) })
        this.setState({ productosLista: [] })
        this.setState({ cargandoSubrubros: false })
    }

    handleSubrubroSelect = (subrubro) => {
        this.setState({ subrubroSeleccionado: subrubro })
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

    handleProductoSelect = (producto) => {
        this.setState({ productoSeleccionado: producto })
    }

    agregarItem = () => {
        if (this.state.productoSeleccionado == '' || this.state.cantidad == '') {
            this.mostrarMensaje('Debe completar todos los campos para agregar un item.')
        }
        else {
            this.setState({ agregandoItem: true })
            var producto = this.state.productos.filter((p) => (
                p.nombre == this.state.productoSeleccionado
            ))
            producto = producto[0]
            const url = 'http://10.0.2.2:8080/tpo/pedidos/agregar-producto-en-pedido?codigoPedido='
                + this.state.numeroPedido + '&codigoProducto=' + producto.identificador + '&cantidad=' + this.state.cantidad
            //let delay = (time) => (result) => new Promise(resolve => setTimeout(() => resolve(result), time));
            fetch(url)
                //.then(delay(5000))
                .then((res) => {
                    if (res.ok) {
                        this.mostrarMensaje('Item agregado correctamente.')
                    }
                    else {
                        const responseData = res.json()
                        this.mostrarMensaje(responseData.message)
                    }
                })
            this.setState({ agregandoItem: false })
        }
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
                <View style={styles.rowLine}>
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
                    <SmallLoading area='rubros' value = {false} />
                </View>
                <View style={styles.rowLine}>
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
                    { this.state.cargandoSubrubros === true ?
                        <ActivityIndicator 
                            animating={this.state.cargandoSubrubros} 
                            size='small' 
                            color='royalblue' 
                        />
                    :   null  
                    }
                </View>
                <View style={styles.rowLine}>
                    <Picker
                        selectedValue={this.state.productoSeleccionado}
                        style={styles.pickers}
                        onValueChange={(itemValue) => this.handleProductoSelect(itemValue)}
                    >
                        {this.state.productosLista.map((producto) =>
                            <Picker.Item
                                label={producto.nombre}
                                value={producto.nombre}
                            />
                        )}
                    </Picker>
                    <SmallLoading 
                        area='productos' 
                        value = {false} 
                    />
                </View>
                <TextInput
                    label='Cantidad'
                    value={this.state.cantidad}
                    onChangeText={cantidad => this.setState({ cantidad })}
                    keyboardType='number-pad'
                    style={styles.cantInput}
                />
                <Button
                    mode="contained"
                    icon="add-circle-outline" 
                    loading={this.state.agregandoItem}
                    onPress={this.agregarItem}
                >Agregar Item
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
    pickers: {
        height: 40,
        width: '90%',
        padding: 10,
        marginBottom: 5
    },
    rowLine: {
        alignItems: 'center',
        flexDirection: 'row',

    },
    cantInput: {
        width: '90%',
        height: 50,
        marginBottom: 5
    }
})


export default AgregarItem
