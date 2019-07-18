import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Dropdown, DropdownButton } from 'react-bootstrap'

export class AppHeader extends Component {

    handleCerrarSesion = () => {
        this.props.history.push('/login');
        this.props.appCerrarSesion();
    }

    handleCambiarPass = () => {
        this.props.history.push('/cambiar-contraseña/' + this.props.username)
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                <div className="container">
                    <a className="navbar-brand" href="/">TPO AD</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className='nav-link' to='/home'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to='/pedidos'>Pedidos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to='/productos'>Productos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to='/clientes'>Clientes</Link>
                            </li>
                        </ul>
                        <span className="navbar-text">
                            <div className="btn-group">
                                <span className="header-username-container">
                                    <span className="header-username">{this.props.username}</span>
                                </span>
                                {this.props.isSessionActive ?
                                    <DropdownButton id="dropdown-basic-button" title="Opciones" variant = 'secondary'>
                                        <Dropdown.Item
                                            onClick={this.handleCambiarPass} 
                                            style ={{ color: 'black' }}>Cambiar Contraseña</Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={this.handleCerrarSesion}
                                            style ={{ color: 'black' }}>Cerrar Sesión</Dropdown.Item>
                                    </DropdownButton>
                                    :
                                    <Link className='nav-link'>
                                        <button type="button" className="btn btn-secondary"
                                            onClick={this.handleCerrarSesion}>Iniciar Sesión</button>
                                    </Link>
                                }
                            </div>
                        </span>
                    </div>
                </div>
            </nav>
        )
    }
}

export default withRouter(AppHeader)
