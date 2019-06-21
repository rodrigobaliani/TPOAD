import React from "react";
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../Home'
import Pedidos from '../Pedidos'
import Productos from '../Productos'
import Clientes from '../Clientes'



const Tab = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-home" size={20} />
        )
      },
    },
    Pedidos: {
      screen: Pedidos,
      navigationOptions: {
        tabBarLabel: "Pedidos",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-cart" size={20} />
        )
      },
    },
    Productos: {
      screen: Productos,
      navigationOptions: {
        tabBarLabel: "Productos",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-beer" size={20} />
        )
      },
    },
    Clientes: {
      screen: Clientes,
      navigationOptions: {
        tabBarLabel: "Clientes",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-people" size={20} />
        )
      },
    }
  },
  {
    activeColor: 'white',
    barStyle: { backgroundColor: 'royalblue' },
    inactiveColor: 'gray',
    initialRouteName: 'Home'
  },

);

const Container = createAppContainer(Tab);
export default Container; 