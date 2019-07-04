import React, { Component } from 'react'
import { View, Picker, StyleSheet } from 'react-native'
import { TextInput, Snackbar, Button } from 'react-native-paper'

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
        mensaje: ''

    }

    componentDidMount() {
        const { navigation } = this.props;
        const numeroPedido = navigation.getParam('numeroPedido', 'NO-ID');
        this.setState({ numeroPedido: numeroPedido })
        fetch('http://10.0.2.2:8080/tpo/rubros')
            .then((res) => res.json()).then((json) => {
                this.setState({
                    rubros: json
                });

            }).catch((error) => {
                alert("Error en API" + error);
            });
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
        this.setState({ rubroSeleccionado: rubro })
        this.setState({ subrubrosLista: this.state.subrubros.filter((subrubro) => rubro == subrubro.rubro.descripcion) })
        this.setState({ productosLista: [] })
    }

    handleSubrubroSelect = (subrubro) => {
        this.setState({ subrubroSeleccionado: subrubro })
        this.setState({ subrubro: subrubro })
        this.setState({ productosLista: this.state.productos.filter((producto) => subrubro == producto.subRubro.descripcion) })

    }

    handleProductoSelect = (producto) => {
        this.setState({ productoSeleccionado: producto })
    }

    agregarItem = () => {
        if (this.state.productoSeleccionado == '' || this.state.cantidad == '') {
            this.mostrarMensaje('Debe completar todos los campos para agregar un item.')
        }
        else {
            var producto = this.state.productos.filter((p) => (
                p.nombre == this.state.productoSeleccionado
            ))
            producto = producto[0]
            const url = 'http://10.0.2.2:8080/tpo/pedidos/agregar-producto-en-pedido?codigoPedido='
                + this.state.numeroPedido + '&codigoProducto=' + producto.identificador + '&cantidad=' + this.state.cantidad
            fetch(url)
                .then((res) => {
                    if (res.ok) {
                        this.mostrarMensaje('Item agregado correctamente.')
                    }
                    else {
                        const responseData = res.json()
                        this.mostrarMensaje(responseData.message)
                    }
                })
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
                
                <Button icon="add-a-photo" mode="contained" onPress={this.agregarItem}>
                        Agregar Item
                </Button>
                <TextInput
                    label='Cantidad'
                    value={this.state.cantidad}
                    onChangeText={cantidad => this.setState({ cantidad })}
                    keyboardType='number-pad'
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
    pickers: {
        height: 50,
        width: '80%',
    }
})


export default AgregarItem
