import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text, Modal, Portal } from 'react-native-paper';

const style = StyleSheet.create({
    modal: {
        margin: 'auto',
        padding: 25,
        maxWidth: 150,
        backgroundColor: 'white',
    }
})


export default class Updating extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: props.visible
        }
    }

    hideModal = () => {
        this.setState({visible: false})
    }

    render = () => {
        return (
            <Portal>
                <Modal contentContainerStyle={style.modal} visible={this.state.visible} dismissable={false}>
                    <ActivityIndicator animating={true} />
                    <Text style={{textAlign: "center", paddingTop: 10}}>Updating...</Text>
                </Modal>
            </Portal>
        )
    }
}
