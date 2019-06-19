import React from "react";
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../Home'
import Pedidos from '../Pedidos'
import Productos from '../Productos'
import Clientes from '../Clientes'

const Tab = createBottomTabNavigator(
    {
        Home: Home,
        Pedidos: Pedidos,
        Productos: Productos,
        Clientes: Clientes
    },
    {
        tabBarOptions: {
            activeTintColor: 'white',
            activeBackgroundColor: 'mediumspringgreen',
            inactiveTintColor: 'gray',
        },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = 'home';
                } else if (routeName === 'Pedidos') {
                    iconName = 'home';
                }
                return <Icon name='home' size={horizontal ? 20 : 25} color={tintColor} />;
            },
        }),
    },
);

const Container = createAppContainer(Tab);
export default Container; 