import React, { Component } from 'react'

export class SubRubro extends Component {
    render() {
        return (
            <option value={this.props.codigo}>{this.props.descripcion}</option>
        )
    }
}

export default SubRubro
