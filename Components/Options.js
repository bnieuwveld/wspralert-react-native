import React, { Component } from 'react';
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

export default class Options extends Component {
    constructor(props) {
        super(props);
        // var visible = this.props.visible || true;
    }

    render() {
        return (
            <Portal>
                <Modal 
                    contentContainerStyle={styles.modal} 
                    visible={this.props.visible} 
                    dismissable={false} 
                    onDismiss={this.props.onModalDismiss}>
                    <Headline>Filter Options</Headline>
                    <TextInput 
                        label="Minimum power (W)"
                        value={minimumPowerW}
                        mode="outlined"
                        style={styles.formElements}
                        render={props => 
                            <TextInputMask
                                {...props}
                                mask="[999.9990]" />}/>
                    <TextInput 
                        label="Minimum distance (km)"
                        value={minimumDistanceKm}
                        mode="outlined"
                        style={styles.formElements} />
                    <Button 
                        mode="contained"
                        style={styles.formElements}
                        onPress={this.props.onModalDismiss}>
                        Set filters
                    </Button>
                </Modal>
            </Portal>
        )
    }
}