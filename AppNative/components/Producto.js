import React, { Component } from 'react';
import { View, StyleSheet, Picker } from 'react-native'
import { TextInput, Snackbar, Button, ActivityIndicator } from 'react-native-paper'
import 'prop-types';


export class Producto extends Component {

    state = {
        rubro: '',
        subrubro: '',
        nombre: '',
        codigoBarras: '',
        marca: '',
        precio: '',
        producto: '',
        rubros: [],
        subrubros: [],
        mensaje: '',
        mostrarMensaje: false,
        subrubrosLista: [],
        cargandoProducto: true
    }

    componentDidMount() {
        this.cargarRubros();
        this.cargarSubRubros();
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
            this.cargarProducto();
        });
    }

    cargarRubros = () => {
        fetch('http://10.0.2.2:8080/tpo/rubros')
            .then((res) => res.json()).then((json) => {
                this.setState({
                    rubros: json
                });

            }).catch((error) => {
                alert("Error en API. Metodo getRubros" + error);
            });
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

    cargarProducto = () => {
        const { navigation } = this.props;
        const identificador = navigation.getParam('identificador', 'NO-ID');
        const send = 'http://10.0.2.2:8080/tpo/productos/byId?identificador=' + identificador
        fetch(send)
            .then((res) => res.json()).then((responseData) => {
                this.setState({ rubro: responseData.rubro })
                this.setState({ subrubro: responseData.subRubro })
                this.setState({ nombre: responseData.nombre })
                this.setState({ codigoBarras: responseData.codigoBarras })
                this.setState({ marca: responseData.marca })
                this.setState({ precio: String(responseData.precio) })
                this.setState({ identificador: responseData.identificador })
                this.setState({ producto: this.generarProducto() })
            });
        this.setState({ cargandoProducto: false })
    }

    generarProducto = () => {
        const productoAux = {
            identificador: this.state.identificador,
            subRubro: this.state.subrubro,
            rubro: this.state.rubro,
            nombre: String(this.state.nombre),
            marca: String(this.state.marca),
            codigoBarras: String(this.state.codigoBarras),
            precio: parseFloat(this.state.precio)
        }
        return productoAux;
    }

    modificarProducto = () => {
        const url = 'http://10.0.2.2:8080/tpo/productos/modificar';
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(this.state.producto),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    this.mostrarMensaje('Producto modificado correctamente')
                }
                else {
                    this.mostrarMensaje("No se pudo modificar el producto.")
                }
            });
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
                <ActivityIndicator
                    animating={this.state.cargandoProducto}
                    size='large'
                    color='royalblue'
                />
                <Picker
                    selectedValue={this.state.rubro.descripcion}
                    style={styles.pickers}
                    enabled={false}
                >
                    {this.state.rubros.map((rubro) =>
                        <Picker.Item
                            key={rubro.codigo}
                            label={rubro.descripcion}
                            value={rubro.descripcion}
                        />
                    )}
                </Picker>
                <Picker
                    selectedValue={this.state.subrubro.descripcion}
                    style={styles.pickers}
                    enabled={false}
                >
                    {this.state.subrubros.map((subrubro) =>
                        <Picker.Item
                            key={subrubro.codigo}
                            label={subrubro.descripcion}
                            value={subrubro.descripcion}
                        />
                    )}
                </Picker>
                <TextInput
                    style = {styles.inputs}
                    label='Nombre'
                    value={this.state.nombre}
                    onChangeText={nombre => this.setState({ nombre })}
                    keyboardType='default'
                    disabled={true}
                />
                <TextInput
                    style = {styles.inputs}
                    label='Marca'
                    value={this.state.marca}
                    onChangeText={marca => this.setState({ marca })}
                    keyboardType='default'
                    disabled={true}
                />
                <TextInput
                    style = {styles.inputs}
                    label='Codigo de Barras'
                    value={this.state.codigoBarras}
                    onChangeText={codigoBarras => this.setState({ codigoBarras })}
                    keyboardType='number-pad'
                    disabled={true}
                />
                <TextInput
                    style = {styles.inputs}
                    label='Precio'
                    value={this.state.precio}
                    onChangeText={precio => this.setState({ precio })}
                    keyboardType='number-pad'
                />
                <Button 
                     mode="contained" 
                     onPress={this.modificarProducto}
                >
                    Modificar Producto
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
    inputs: {
        width: '90%',
        height: 50,
        marginBottom: 5
    }
})


export default Producto
