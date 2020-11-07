import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider, Appbar, DefaultTheme } from 'react-native-paper';



export default function HeaderBar() {
    return (
        <Appbar.Header dark={true}>
            <Appbar.Action icon="menu" />
            <Appbar.Content title="WsprAlert" subtitle="See the latest results from Wsprnet." />
        </Appbar.Header>
    )
}