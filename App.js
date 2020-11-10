import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { Provider as PaperProvider, Appbar, DefaultTheme, Portal } from 'react-native-paper';
import HeaderBar from './Components/HeaderBar';
import ResultsPage from './Components/ResultsPage';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0D47A1'
  }
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Portal.Host>
        <HeaderBar />
        <ScrollView>
          <ResultsPage />
        </ScrollView>
      </Portal.Host>
    </PaperProvider>
  );
}
