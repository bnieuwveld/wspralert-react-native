import React, { Component, useState } from 'react';
import { Portal, Modal, Surface, Text, Headline, TextInput, Button } from 'react-native-paper';
// import TextInputMask from 'react-native-text-input-mask'

const styles = {
    modal: {
        margin: 'auto',
        padding: 25,
        maxWidth: 400,
        minWidth: 300,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    formElements: {
        margin: 10
    }
}

var minimumPowerW, minimumDistanceKm;

const Options = (props) => {
    const [minPower, setMinPower] = useState('');
    const [minDistance, setMinDistance] = useState('');

    return (
        <Portal>
            <Modal
                contentContainerStyle={styles.modal}
                visible={props.visible}
                dismissable={false}
                onDismiss={props.onModalDismiss}>
                <Headline>Filter Options</Headline>
                <TextInput
                    label="Minimum power (W)"
                    value={minPower}
                    onChangeText={text => setMinPower(text)}
                    mode="outlined"
                    style={styles.formElements} />
                <TextInput
                    label="Minimum distance (km)"
                    value={minDistance}
                    onChangeText={text => setMinDistance(text)}
                    mode="outlined"
                    style={styles.formElements} />
                <Button
                    mode="contained"
                    style={styles.formElements}
                    onPress={props.onModalDismiss}>
                    Set filters
                    </Button>
            </Modal>
        </Portal>
    )
}

export default Options;