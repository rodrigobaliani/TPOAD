import React from 'react'
import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';

import Pedidos from '../Pedidos'
import Productos from '../Productos'
import Clientes from '../Clientes'
import Login from '../Login'
import Pedido from '../Pedido'
import Producto from '../Producto'
import AltaProducto from '../AltaProducto'
import AgregarItem from '../AgregarItem'
import Usuario from '../Usuario'
import CambiarPassword from '../CambiarPassword'
import CambiarPasswordSinLogin from '../CambiarPasswordSinLogin'
import VerificarUsuario from '../VerificarUsuario'

const backgroundColor = '#d32f2f'
const headerTextColor = '#ffffff'

const PedidosStack = createStackNavigator({
    Pedidos: {
        screen: Pedidos,
        navigationOptions: {
            headerTitle: 'Pedidos',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            },
            headerStyle: {
                backgroundColor: backgroundColor,
              },
            headerTintColor: headerTextColor,
        }
    },
    Pedido: { 
        screen: Pedido,
        navigationOptions: {
            headerTitle: 'Detalle de Pedido',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            },
            headerStyle: {
                backgroundColor: backgroundColor,
              },
            headerTintColor: headerTextColor,
            
        }
     },
     AgregarItem: {
        screen: AgregarItem,
        navigationOptions: {
            headerTitle: 'Agregar Item',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            },
            headerStyle: {
                backgroundColor: backgroundColor,
              },
            headerTintColor: headerTextColor,
        }
     }
})

PedidosStack.navigationOptions = {
    tabBarLabel: "Pedidos",
    tabBarIcon: ( <Icon name="md-cart" size={20} /> )
}

const ProductosStack = createStackNavigator({
    Productos: {
        screen: Productos,
        navigationOptions: {
            headerTitle: 'Productos',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            },
            headerStyle: {
                backgroundColor: backgroundColor,
              },
            headerTintColor: headerTextColor,
        }
    },
    Producto: { 
        screen: Producto,
        navigationOptions: {
            headerTitle: 'Modificar Producto',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            },
            headerStyle: {
                backgroundColor: backgroundColor,
              },
            headerTintColor: headerTextColor,
        }
     },
     AltaProducto: { 
        screen: AltaProducto,
        navigationOptions: {
            headerTitle: 'Alta Producto',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            },
            headerStyle: {
                backgroundColor: backgroundColor,
              },
            headerTintColor: headerTextColor,
        }
     }
     
})

ProductosStack.navigationOptions = {
    tabBarLabel: "Productos",
    tabBarIcon: ( <Icon name="md-nutrition" size={20} /> )
}

const ClientesStack = createStackNavigator({
    Clientes: {
        screen: Clientes,
        navigationOptions: {
            headerTitle: 'Clientes',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            },
            headerStyle: {
                backgroundColor: backgroundColor,
              },
            headerTintColor: headerTextColor,
        }
    }
})

ClientesStack.navigationOptions = {
    tabBarLabel: "Clientes",
    tabBarIcon: ( <Icon name="md-people" size={20} /> )
}

const UsuarioStack = createStackNavigator({
    Usuario: {
        screen: Usuario,
        navigationOptions: {
            headerTitle: 'Usuario',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            },
            headerStyle: {
                backgroundColor: backgroundColor,
              },
            headerTintColor: headerTextColor,
        }
    },
    VerificarUsuario: {
        screen: VerificarUsuario,
        navigationOptions: {
            headerTitle: 'Cambio de Password',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            },
            headerStyle: {
                backgroundColor: backgroundColor,
              },
            headerTintColor: headerTextColor,
        }
    },
    CambiarPassword: { 
        screen: CambiarPassword,
        navigationOptions: {
            headerTitle: 'Cambio de Password',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            },
            headerStyle: {
                backgroundColor: backgroundColor,
              },
            headerTintColor: headerTextColor,
        }
     }
})

UsuarioStack.navigationOptions = {
    tabBarLabel: "Usuario",
    tabBarIcon: ( <Icon name="md-contact" size={20} /> )
}



const AppTabNavigator = createMaterialBottomTabNavigator(
    {
        PedidosStack,
        ProductosStack,
        ClientesStack,
        UsuarioStack
    },
    {
        barStyle: { backgroundColor: backgroundColor },
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state.routes[navigation.state.index];
            return {
                header: null,
                headerTitle: routeName,
                headerTitleStyle: {
                    textAlign: "center",
                    flex: 1
                },
            };
        }
    },
);

const AppStackNavigator = createStackNavigator(
    {
        AppTabNavigator: AppTabNavigator
    });


const AppSwitchNavigator = createSwitchNavigator({
    Login: { screen: Login },
    CambiarPasswordSinLogin: { screen: CambiarPasswordSinLogin },
    App: { screen: AppStackNavigator }
});

const Navigator = createAppContainer(AppSwitchNavigator)

export default Navigator
