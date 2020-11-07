import React, { Component } from 'react';
import { Snackbar } from 'react-native-paper';

const UpdateFailedSnackbar = (props) => {

    const [visible, setVisible] = React.useState(false);
    const onDismissSnackbar = () => setVisible(false);
    const onToggleSnackbar = () => setVisible(!visible);

    console.log("Snackbar visible? " + visible)

    return (
        <Snackbar
            visible={props.visible}
            duration={1000}
            onDismiss={onDismissSnackbar}
            action={{
                label: 'OK',
                onPress: () => {
                    onDismissSnackbar
                }
            }}
        >Update failed! Data may not be accurate.</Snackbar>
    )
}

export default UpdateFailedSnackbar;