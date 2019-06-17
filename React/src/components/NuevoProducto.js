import React, {Component} from 'react'
import {FormGroup, Form, InputGroup, FormControl, Button, FormLabel} from 'react-bootstrap';
import Rubro from './Rubro';
import SubRubro from './SubRubro';
import queryString from 'query-string';

export class NuevoProducto extends Component {

    state = {
        rubro: '',
        subRubro: '',
        nombre: '',
        codigoBarras: '',
        marca: '',
        precio: '',
        subRubros: [],
        rubros: [],
        rubrosLista: [],
        subRubrosLista: []
    }

    componentDidMount = () => {
        this.cargarRubros()
    }

    generarProducto = () => {
        var rubroAux = this.state.rubros.filter((rubro) => rubro.descripcion === this.state.rubro)
        var subrubroAux = this.state.subRubros.filter((subRubro) => subRubro.descripcion === this.state.subRubro)
        const producto = {
            identificador: 1,
            subRubro: subrubroAux[0], // FILTER DEVUELVE VECTOR
            rubro: rubroAux[0], // FILTER DEVUELVE VECTOR
            nombre: String(this.state.nombre),
            marca: String(this.state.marca),
            codigoBarras: String(this.state.codigoBarras),
            precio: parseFloat(this.state.precio)
        }
        return producto;
    }

    nuevoProducto = (e) => {
        e.preventDefault()
        const producto = this.generarProducto();
        const url = 'http://localhost:8080/tpo/productos/alta';
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

    


    handleSelectRubroChange = (e) => {
        const rubro = e.target.value;
        this.setState({
            rubro: rubro,
            subRubrosLista: this.state.subRubros.filter((subRubro) => rubro == subRubro.rubro.descripcion)
        })
    }

    handleSelectSubRubroChange = (e) => {
        this.setState({subRubro: e.target.value})
    }

    handleSelectNombreChange = (e) => {
        this.setState({nombre: e.target.value})
    }

    handleSelectMarcaChange = (e) => {
        this.setState({marca: e.target.value})
    }

    handleSelectCodigoBarrasChange = (e) => {
        this.setState({codigoBarras: e.target.value})
    }

    handleSelectPrecioChange = (e) => {
        this.setState({precio: e.target.value})
    }


    cargarRubros = () => {
        fetch('http://localhost:8080/tpo/rubros')
            .then((res) => res.json()).then((json) => {
            this.setState({
                rubros: json
            });

        }).catch((error) => {
            alert("Error en cargarRubros" + error);
        });
        fetch('http://localhost:8080/tpo/sub-rubros/')
            .then((res) => res.json()).then((json) => {
            this.setState({
                subRubros: json
            });
        }).catch((error) => {
            alert("Error en cargarSubrubros" + error);
        });
    }


    render() {
        return (
            <Form>
                <FormGroup>
                    <h1>Nuevo Producto</h1>
                    <br></br>
                    <br></br>
                    <InputGroup className="mb-3">
                        <Form.Group>
                            <Form.Label>Rubro</Form.Label>
                            <Form.Control as="select" onClick={this.handleSelectRubroChange}>
                                <React.Fragment>
                                    {this.state.rubros.map((rubroAux) => (
                                        <Rubro
                                            key={rubroAux.codigo}
                                            descripcion={rubroAux.descripcion}
                                        />
                                    ))}
                                </React.Fragment>
                            </Form.Control>
                            <Form.Text className="text-muted">
                                Es obligatorio seleccionar un rubro
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formGridSubRubro">

                            {this.state.rubro !== '' ?
                                <React.Fragment>
                                    <Form.Label>SubRubro</Form.Label>
                                    <Form.Control as="select" onChange={this.handleSelectSubRubroChange}>
                                        <React.Fragment>
                                            {this.state.subRubrosLista.map((subRubro) => (
                                                <SubRubro
                                                    key={subRubro.codigo}
                                                    descripcion={subRubro.descripcion}
                                                />
                                            ))}
                                        </React.Fragment>
                                    </Form.Control>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Form.Label>SubRubro</Form.Label>
                                    <Form.Control as="select" onChange={this.handleSelectSubRubroChange}>
                                        <option></option>
                                    </Form.Control>
                                </React.Fragment>
                            }
                            <Form.Text className="text-muted">
                                Es obligatorio seleccionar un subrubro
                            </Form.Text>
                        </Form.Group>

                    </InputGroup>

                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Nombre</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={this.handleSelectNombreChange}
                        />
                    </InputGroup>
                    <br></br>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Marca</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={this.handleSelectMarcaChange}
                        />
                    </InputGroup>

                    <br></br>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Codigo Barras</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={this.handleSelectCodigoBarrasChange}
                        />
                    </InputGroup>
                    <br></br>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default" size='100px'>Precio</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={this.handleSelectPrecioChange}
                        />
                    </InputGroup>
                    <br></br>

                </FormGroup>
                <Button variant='success' block type='submit' onClick={this.nuevoProducto.bind(this)}> Añadir </Button>
            </Form>
        )
    }
}


export default NuevoProducto