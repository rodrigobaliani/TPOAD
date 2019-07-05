import React, {Component} from 'react';
import {Button, Dropdown, DropdownButton, Form, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {trackPromise} from "react-promise-tracker";
import Loading from './Loading';
import Select from 'react-select';

class Productos extends Component {

    state = {
        rubrosSource: [],
        subRubrosSource: [],
        rubrosOptions: [],
        subRubrosOptions: [],
        subRubroSelectedOption: null,
        subRubrosLista: [],
        productosSource: [],
        productosLista: []
    }

    componentDidMount() {
        this.cargarProductos();
        this.cargarRubros();
    }

    cargarRubros = () => {
        trackPromise(
            fetch('http://localhost:8080/tpo/rubros').then((res) => res.json())
                .then((json) => {
                    const rubros = json;
                    this.setState({
                        rubrosSource: rubros,
                        rubrosOptions: rubros.map(function (rubro) {
                            return {value: rubro.codigo, label: rubro.descripcion}
                        })
                    });
                })
                .catch((error) => {
                    alert("Error en API" + error);
                })
        );

        trackPromise(
            fetch('http://localhost:8080/tpo/sub-rubros/').then((res) => res.json())
                .then((json) => {
                    const subRubros = json;
                    this.setState({
                        subRubrosSource: subRubros
                    });
                })
                .catch((error) => {
                    alert("Error en API" + error);
                })
        );
    }

    cargarProductos = () => {
        trackPromise(
            fetch('http://localhost:8080/tpo/productos/')
                .then((res) => res.json()).then((json) => {
                this.setState({
                    productosSource: json,
                    productosLista: json
                });
            }).catch((error) => {
                alert("Error en API" + error);
            })
        );
    }

    setProductoAModificar = (numeroProducto) => {
        console.log(numeroProducto)
        if (numeroProducto == -1)
            this.setState({productoAModificar: null})
        else {
            const producto = this.state.productos.filter((producto) => producto.identificador === numeroProducto)
            this.setState({productoAModificar: producto})
        }
    }

    eliminarProducto = (productoAux) => {
        const url = 'http://localhost:8080/tpo/productos/';
        fetch(url, {method: 'DELETE', body: {'producto': productoAux}})
            .then((res) => {
                if (res.ok) {
                    this.setState({productos: [...this.state.productosSource.filter(producto => producto != productoAux)]})
                }
            });
    }

    modificarProducto = (identificador) => {
        this.props.history.push('/productos/modificar/' + (identificador))
        /* const url = 'http://localhost:8080/tpo/productos/modificar';
         fetch(url, { method: 'put', body: {'producto': productoAux}})
             .then();
         this.setState({ productos: [...this.state.productos.filter(producto => producto !== productoAux)] })
         this.setState({ productos: [...this.state.productos.filter(producto => producto !== productoAux)] })*/
    }

    handleSelectRubroOnChange = (selectedOption) => {
        const codigoRubro = selectedOption.value;
        const subRubrosFiltradosPorRubro = this.state.subRubrosSource.filter((subRubro) => codigoRubro == subRubro.rubro.codigo);
        this.setState({
            subRubrosOptions: subRubrosFiltradosPorRubro.map(function (subRubro) {
                return {value: subRubro.codigo, label: subRubro.descripcion}
            }),
            subRubroSelectedOption: null
        });
    }

    handleSelectSubRubroOnChange = (selectedOption) => {
        let codigoSubRubro = selectedOption.value;
        this.setState({
            subRubroSelectedOption: selectedOption,
            productosLista: this.state.productosSource.filter((producto) => codigoSubRubro == producto.subRubro.codigo)
        });
    }

    render() {
        return (
            <React.Fragment>
                <h2 className="mb-3">Productos</h2>

                <Form>
                    <Form.Group className="col-lg-7 no-padding-left">
                        <Form.Label>Rubro</Form.Label>
                        <Select options={this.state.rubrosOptions} onChange={this.handleSelectRubroOnChange}
                                placeholder="Seleccione un rubro..."/>
                    </Form.Group>

                    <Form.Group controlId="formGridSubRubro" className="col-lg-7 no-padding-left">
                            <Form.Label>Sub Rubro</Form.Label>
                            <Select options={this.state.subRubrosOptions} onChange={this.handleSelectSubRubroOnChange}
                                    value={this.state.subRubroSelectedOption} placeholder="Seleccione un sub rubro..."/>
                    </Form.Group>
                </Form>

                <span className="float-right mb-3">
                    <Link to='/productos/nuevo-producto'>
                        <Button variant='primary' type='submit'>
                            Nuevo Producto
                        </Button>
                    </Link>
                </span>

                <Table striped bordered hover>
                    <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Código de Barras</th>
                        <th>Precio</th>
                        <th>Opciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    <React.Fragment>
                        {this.state.productosLista.map((producto) => (
                            <tr>
                                <td>{producto.identificador}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.marca}</td>
                                <td>{producto.codigoBarras}</td>
                                <td>{producto.precio}</td>
                                <td><DropdownButton id="dropdown-basic-button" title="Opciones">
                                    <Dropdown.Item
                                        onClick={this.modificarProducto.bind(this, producto.identificador)}>Modificar</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={this.eliminarProducto.bind(this, producto)}>Eliminar</Dropdown.Item>
                                </DropdownButton>
                                </td>
                            </tr>
                        ))}
                    </React.Fragment>

                    </tbody>
                </Table>

                <Loading/>

            </React.Fragment>
        )
    }
}

export default Productos;