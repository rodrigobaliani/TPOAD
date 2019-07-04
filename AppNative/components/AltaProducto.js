import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, ListView, TouchableHighlight, Text, Picker} from 'react-native'
import { List, Divider, FAB, TextInput, Snackbar, Button } from 'react-native-paper'
import { NavigationEvents } from "react-navigation";
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
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
        subrubrosLista: []
    }

    componentDidMount() {
        this._subscribe = this.props.navigation.addListener('didFocus', () => {});
        fetch('http://10.0.2.2:8080/tpo/rubros')
            .then((res) => res.json()).then((json) => {
                this.setState({
                    rubros: json
                });

            }).catch((error) => {
                alert("Error en API. Metodo getRubros" + error);
            });
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
            headers:{
              'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.ok)
            {
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

    
    render() {
        return (
            <View  style={styles.container}>
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
                <TextInput
                    label='Nombre'
                    value={this.state.nombre}
                    onChangeText={nombre => this.setState({ nombre })}
                    keyboardType='default'
                />
                <TextInput
                    label='Marca'
                    value={this.state.marca}
                    onChangeText={marca => this.setState({ marca })}
                    keyboardType='default'
                />
                <TextInput
                    label='Codigo de Barras'
                    value={this.state.codigoBarras}
                    onChangeText={codigoBarras => this.setState({ codigoBarras })}
                    keyboardType='number-pad'
                />
                <TextInput
                    label='Precio'
                    value={this.state.precio}
                    onChangeText={precio => this.setState({ precio })}
                    keyboardType='number-pad'
                />
                 <Button icon="add-circle-outline" mode="contained" onPress={this.nuevoProducto}>
                        Crear Nuevo Producto
                </Button>
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

export default AltaProducto
