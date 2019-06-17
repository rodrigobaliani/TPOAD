import React, { Component } from 'react'
import { FormGroup, Form, InputGroup, FormControl, Button, FormLabel } from 'react-bootstrap';
import Rubro from './Rubro';
import SubRubro from './SubRubro';


class ModificarProducto extends Component {

    state = {
        rubro: '',
        subrubro:'',
        nombre: '',
        codigoBarras:'',
        marca:'',
        precio:'',
        subrubros:[],
        rubros:[],
        rubrosLista: [],
        subrubrosLista:[],
        producto:''
    }

    componentDidMount = () => {
        this.cargarRubros();
        this.cargarProducto(this.props.match.params.identificador);
        /*this.setState({ nombre: this.state.producto.nombre })
        this.setState({ marca: this.state.producto.marca })
        this.setState({ codigoBarras: this.state.producto.codigoBarras})
        this.setState({ precio: this.state.producto.precio})*/
    }



    cargarProducto = (identificador) => {
        fetch('http://localhost:8080/tpo/productos/byId?identificador=' + identificador)
            .then((res) => res.json()).then((json) => {
                this.setState({
                    producto: json,
                });
            }).catch((error) => {
                alert("Error en API" + error);
            });
    }


    generarProducto = () => {
        var rubroAux = this.state.rubros.filter((rubro) => rubro.descripcion === this.state.rubro)
        var subrubroAux = this.state.subrubros.filter((subrubro) => subrubro.descripcion === this.state.subrubro)
        const producto = {
            identificador : this.state.producto.identificador,
            subRubro: subrubroAux[0], // FILTER DEVUELVE VECTOR
            rubro: rubroAux[0], // FILTER DEVUELVE VECTOR
            nombre: String(this.state.nombre),
            marca: String(this.state.marca),
            codigoBarras: String(this.state.codigoBarras),
            precio: parseFloat(this.state.precio)
        }
       
        return(producto)
    }

    modificarProducto = (e) => {
        e.preventDefault();
        const producto = this.generarProducto(); 
        console.log("pr")
        console.log(producto)
        const url = 'http://localhost:8080/tpo/productos/modificar';
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(producto),
            headers :{
                'Content-Type': 'application/json'
              }
        }).then(res => {
            if(res.ok)
            {
                alert('Producto modificado correctamente')
            }  
          });

            /*.then().catch((error) => {
                alert("Error en API NEW PRODUCTO" + error);
              });;*/
    }


    handleSelectRubroChange = (e) => {
        this.setState({ rubro: e.target.value })
        const rubro = e.target.value
        this.setState({ subrubrosLista: this.state.subrubros.filter((subrubro) => rubro == subrubro.rubro.descripcion) })
    }

    handleSelectSubRubroChange = (e) => {
        this.setState({ subrubro: e.target.value })
    }

    handleSelectNombreChange = (e) => {
        this.setState( { nombre: e.target.value })
    }
    
    handleSelectMarcaChange = (e) => {
        this.setState( { marca: e.target.value }) 
    }

    handleSelectCodigoBarrasChange = (e) => {
        this.setState( { codigoBarras: e.target.value }) 
    }

    handleSelectPrecioChange = (e) => {
        this.setState( { precio: e.target.value }) 
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
          subrubros: json
        });
      }).catch((error) => {
        alert("Error en cargarSubrubros" + error);
      });
    }


    render() {
        return (
            <Form>
                <FormGroup>
                    <h1>Modificar Producto</h1>
                    <br></br>
                    <br></br>
                    <InputGroup className="mb-3">
                    <Form.Group>
                        <Form.Label>Rubro</Form.Label>
                        <Form.Control as="select" onClick={this.handleSelectRubroChange}>
                            <React.Fragment>
                                {
                                    this.state.rubros.map((rubroAux) => (
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
                                        {this.state.subrubrosLista.map((subrubro) => (
                                            <SubRubro
                                                key={subrubro.codigo}
                                                descripcion={subrubro.descripcion}
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
                            value = {this.state.nombre}
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
                            value = {this.state.marca}
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
                            value = {this.state.codigoBarras}
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
                            value = {this.state.precio}
                        />
                    </InputGroup>
                    <br></br>

                </FormGroup>
                <Button variant='success' block type='submit' onClick = {this.modificarProducto.bind(this)}> Modificar </Button>
            </Form>
        )
    }
}


export default ModificarProducto