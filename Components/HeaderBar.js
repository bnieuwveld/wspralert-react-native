import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Appbar, Portal, Text, Modal } from 'react-native-paper';
import Options from './Options';



export default class HeaderBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionsVisible: false
        }
    }
    onPressSettings = () => {
        this.setState({optionsVisible: true})
    }

    onModalDismiss = () => {
        this.setState({optionsVisible: false})
    }

    render() {
        return (
            <Appbar.Header dark={true}>
                <Appbar.Action icon="settings" onPress={this.onPressSettings} />
                <Appbar.Content title="WsprAlert" subtitle="See the latest results from Wsprnet." />

                <Options visible={this.state.optionsVisible} onModalDismiss={this.onModalDismiss} />
            </Appbar.Header>
        )
    }
}