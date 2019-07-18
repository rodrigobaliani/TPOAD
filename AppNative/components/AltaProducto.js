import React, { Component } from 'react'
import { View, StyleSheet, Picker } from 'react-native'
import { TextInput, Button, ActivityIndicator, Snackbar } from 'react-native-paper'
import { trackPromise } from "react-promise-tracker";
import SmallLoading from './SmallLoading'
import 'prop-types';

export class AltaProducto extends Component {

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
        rubroSeleccionado: '',
        subrubroSeleccionado: '',
        subrubrosLista: [],
        cargandoSubrubros: true,
        mensaje: '',
        mostrarMensaje: false,
    }

    componentDidMount() {
        this._subscribe = this.props.navigation.addListener('didFocus', () => { });
        trackPromise(
            fetch('http://10.0.2.2:8080/tpo/rubros')
                .then((res) => res.json()).then((json) => {
                    this.setState({
                        rubros: json
                    });

                }).catch((error) => {
                    alert("Error en API. Metodo getRubros" + error);
                })
            , 'rubros')
        fetch('http://10.0.2.2:8080/tpo/sub-rubros/')
            .then((res) => res.json()).then((json) => {
                this.setState({
                    subrubros: json
                });
            }).catch((error) => {
                alert("Error en API. Metodo getSubRubros" + error);
            });
    }

    handleRubroSelect = (rubro) => {
        this.setState({ rubroSeleccionado: rubro })
        this.setState({ subrubrosLista: this.state.subrubros.filter((subrubro) => rubro == subrubro.rubro.descripcion) })
        this.setState({ cargandoSubrubros: false })
    }

    handleSubrubroSelect = (subrubro) => {
        this.setState({ subrubroSeleccionado: subrubro })
        this.setState({ subrubro: subrubro })
    }



    nuevoProducto = () => {
        const producto = this.generarProducto();
        //verificar producto.
        /*alert(producto.identificador);
        alert(producto.subRubro.descripcion);
        alert(producto.rubro.descripcion);
        alert(producto.nombre);
        alert(producto.marca);
        alert(producto.codigoBarras);
        alert(producto.precio);*/

        const url = 'http://10.0.2.2:8080/tpo/productos/alta';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    alert('Producto creado correctamente')
                }
            });
    }

    generarProducto = () => {
        var rubroAux = this.encontrarRubro(this.state.rubroSeleccionado)
        var subrubroAux = this.encontrarSubRubro(this.state.subrubroSeleccionado)
        const producto = {
            identificador: 1,
            subRubro: subrubroAux, // FILTER DEVUELVE VECTOR
            rubro: rubroAux, // FILTER DEVUELVE VECTOR
            nombre: String(this.state.nombre),
            marca: String(this.state.marca),
            codigoBarras: String(this.state.codigoBarras),
            precio: parseFloat(this.state.precio)
        }

        return producto;
    }

    encontrarSubRubro = (descripcion) => {
        auxiliar = this.state.subrubros.filter((subrubro) => descripcion == subrubro.descripcion);
        respuesta = auxiliar[0];

        return respuesta;
    }

    encontrarRubro = (descripcion) => {
        auxiliar = this.state.rubros.filter((rubro) => descripcion == rubro.descripcion);
        respuesta = auxiliar[0];

        return respuesta;
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
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <Picker
                        selectedValue={this.state.rubroSeleccionado}
                        style={styles.pickers}
                        onValueChange={(itemValue) => this.handleRubroSelect(itemValue)}
                    >
                        {this.state.rubros.map((rubro) =>
                            <Picker.Item
                                key={rubro.codigo}
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
                                key={subrubro.codigo}
                                label={subrubro.descripcion}
                                value={subrubro.descripcion}
                            />
                        )}
                    </Picker>
                    {this.state.cargandoSubrubros === true ?
                        <ActivityIndicator
                            animating={this.state.cargandoSubrubros}
                            size='small'
                            color='#d32f2f'
                        />
                    : null
                    }
                </View>
                <TextInput
                    style={styles.inputs}
                    label='Nombre'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.nombre}
                    onChangeText={nombre => this.setState({ nombre })}
                    keyboardType='default'
                />
                <TextInput
                    style={styles.inputs}
                    label='Marca'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.marca}
                    onChangeText={marca => this.setState({ marca })}
                    keyboardType='default'
                />
                <TextInput
                    style={styles.inputs}
                    label='Codigo de Barras'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.codigoBarras}
                    onChangeText={codigoBarras => this.setState({ codigoBarras })}
                    keyboardType='number-pad'
                />
                <TextInput
                    style={styles.inputs}
                    label='Precio'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.precio}
                    onChangeText={precio => this.setState({ precio })}
                    keyboardType='number-pad'
                />
                <Button 
                    icon="add-circle-outline" 
                    mode="contained" 
                    color = '#d32f2f' 
                    onPress={this.nuevoProducto}
                >
                    Crear Nuevo Producto
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
        justifyContent: 'center'
    },
    pickers: {
        height: 50,
        width: '90%',
    },
    inputs: {
        width: '90%',
        height: 50,
        marginBottom: 5
    }
})

export default AltaProducto
