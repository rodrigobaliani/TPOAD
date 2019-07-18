import React from 'react';
import {Text, View} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import Navigator from './components/layout/Navigator'

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true; 
    return (
      <PaperProvider>
        <Navigator/>
      </PaperProvider>  
    )
  }
}




