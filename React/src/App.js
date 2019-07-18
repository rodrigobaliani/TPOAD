import React, {Component} from 'react';
import AppHeader from './components/layout/AppHeader';
import Home from './components/Home'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Pedidos from './components/Pedidos'
import Productos from './components/Productos';
import NuevoProducto from './components/NuevoProducto';
import ModificarProducto from './components/ModificarProducto';
import Clientes from './components/Clientes';
import Login from './components/Login';
import Pedido from './components/Pedido';
import CambiarContraseña from './components/CambiarContraseña';


class App extends Component {

    state = {
        isSessionActive: false,
        username: ''
    }

    handleChildCerrarSesion = () => {
        this.setState({
            isSessionActive: false,
            username: ''
        });
    }

    handleChildLogin = (username) => {
        this.setState({
            isSessionActive: true,
            username: username
        })
    }


    render() {
        return (
            <Router>
                <div className="App">
                    <AppHeader username={this.state.username} isSessionActive={this.state.isSessionActive}
                               appCerrarSesion={this.handleChildCerrarSesion}/>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <Route exact path='/' component={Home}/>
                                <Route exact path='/home' component={Home}/>
                                <Route exact path='/pedidos' component={Pedidos}/>
                                <Route exact path='/pedidos/modificar/:numeroPedido' component={Pedido}/>
                                <Route exact path='/productos' component={Productos}/>
                                <Route exact path='/productos/nuevo-producto' component={NuevoProducto}/>
                                <Route exact path='/productos/modificar/:identificador' component={ModificarProducto}/>
                                <Route exact path='/clientes' component={Clientes}/>
                                <Route exact path='/login' render={() => <Login appLogin={this.handleChildLogin}/>}/>
                                <Route exact path='/cambiar-contraseña/:usuario' component={CambiarContraseña}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
