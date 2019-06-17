import React, { Component } from 'react'

class ProductoLista extends Component {
    render() {
        return (
            <React.Fragment>
                <option>{this.props.nombre}</option>
            </React.Fragment>
        )
    }
}

export default ProductoLista
