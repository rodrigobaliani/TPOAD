import React, { Component } from 'react'

export class Rubro extends Component {
    render() {
        return (
            <option>{this.props.descripcion}</option>
        )
    }
}

export default Rubro
