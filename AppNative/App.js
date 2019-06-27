import React from 'react';
import {Text, View} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import TabMenu from './components/layout/TabMenu'

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider>
        <TabMenu/>
      </PaperProvider>  
    )
  }
}




