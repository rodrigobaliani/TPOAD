import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

export class AppHeader extends Component {

    handleCerrarSesion = () => {
        this.props.history.push('/login');
        this.props.appCerrarSesion();
    }

    isSessionActive = () => {
        if(this.props.isSessionActive)
            return 'Cerrar sesión'
        else
            return 'Iniciar sesión'    
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
                                <Link className='nav-link'>
                                    <button type="button" className="btn btn-secondary"
                                            onClick={this.handleCerrarSesion}>{this.isSessionActive()}</button>
                                </Link>
                            </div>
                        </span>
                    </div>
                </div>
            </nav>
        )
    }
}

export default withRouter(AppHeader)
