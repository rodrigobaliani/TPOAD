import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, ListView, TouchableHighlight, Text, Picker } from 'react-native'
import { List, Divider, FAB, TextInput, Snackbar, Button } from 'react-native-paper'
import { NavigationEvents } from "react-navigation";
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
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
        rubroSeleccionado: '',
        subrubroSeleccionado : '',
        subrubrosLista: []
    }

    componentDidMount() {
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
            this.cargarProducto();
        });
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
                this.setState({ precio: parseFloat(responseData.precio)})
                this.generarProducto()
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

    generarProducto = () => {
        var rubroAux = this.state.rubroSeleccionado
        var subrubroAux = this.state.subrubroSeleccionado
        const producto = {
            identificador: 1,
            subRubro: subrubroAux,
            rubro: rubroAux, 
            nombre: String(this.state.nombre),
            marca: String(this.state.marca),
            codigoBarras: String(this.state.codigoBarras),
            precio: parseFloat(this.state.precio)
        }
        return producto;
    }

    modificarProducto = () => {
        const producto = this.generarProducto();
        const url = 'http://10.0.2.2:8080/tpo/productos/modificar';
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(producto),
            headers:{
              'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.ok)
            {
                alert('Producto modificado correctamente')
            }  
          });   
    }




    render() {
        return (
            <View style={styles.container}>
                <Picker
                    selectedValue={this.state.rubroSeleccionado}
                    style={styles.pickers}
                    onValueChange={(itemValue) => this.handleRubroSelect(itemValue)}
                    enabled = {false}
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
                    enabled = {false}
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
                    disabled={true}
                />
                <TextInput
                    label='Marca'
                    value={this.state.marca}
                    onChangeText={marca => this.setState({ marca })}
                    keyboardType='default'
                    disabled={true}
                />
                <TextInput
                    label='Codigo de Barras'
                    value={this.state.codigoBarras}
                    onChangeText={codigoBarras => this.setState({ codigoBarras })}
                    keyboardType='number-pad'
                    disabled={true}
                />
                <TextInput
                    label='Precio'
                    value={this.state.precio}
                    onChangeText={precio => this.setState({ precio })}
                    keyboardType='number-pad'
                />
                <Button icon="add-circle-outline" mode="contained" onPress={this.modificarProducto}>
                    Modificar Producto
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


export default Producto
