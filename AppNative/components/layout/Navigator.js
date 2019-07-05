import React from 'react'
import { View, Text } from 'react-native'
import { createSwitchNavigator, createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';
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

const PedidosStack = createStackNavigator({
    Pedidos: {
        screen: Pedidos,
        navigationOptions: {
            headerTitle: 'Pedidos',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            }
        }
    },
    Pedido: { 
        screen: Pedido,
        navigationOptions: {
            headerTitle: 'Detalle de Pedido',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            }
        }
     },
     AgregarItem: {
        screen: AgregarItem,
        navigationOptions: {
            headerTitle: 'Agregar Item',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            }
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
            }
        }
    },
    Producto: { 
        screen: Producto,
        navigationOptions: {
            headerTitle: 'Modificar Producto',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            }
        }
     },
     AltaProducto: { 
        screen: AltaProducto,
        navigationOptions: {
            headerTitle: 'Alta Producto',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            }
        }
     }
     
})

ProductosStack.navigationOptions = {
    tabBarLabel: "Productos",
    tabBarIcon: ( <Icon name="md-cart" size={20} /> )
}

const ClientesStack = createStackNavigator({
    Clientes: {
        screen: Clientes,
        navigationOptions: {
            headerTitle: 'Clientes',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            }
        }
    }
})

ClientesStack.navigationOptions = {
    tabBarLabel: "Clientes",
    tabBarIcon: ( <Icon name="md-people" size={20} /> )
}

const AppTabNavigator = createMaterialBottomTabNavigator(
    {
        PedidosStack,
        ProductosStack,
        ClientesStack
    },
    {
        barStyle: { backgroundColor: 'royalblue' },
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
    App: { screen: AppStackNavigator }
});

const Navigator = createAppContainer(AppSwitchNavigator)

export default Navigator
