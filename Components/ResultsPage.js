import React, { Component, useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import ResultsList from './ResultsList';
import axios from 'axios'
import { Snackbar, Portal, ActivityIndicator, Modal, Text, HelperText } from 'react-native-paper';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

// Keep track of 2 separate timers. 
// There'll be a timer (120 seconds by default) to refresh the API, and a timer that ticks every second until the next update.
var apiInterval, timerInterval;

// Make everything look pretty.
const style = StyleSheet.create({
    container: {
        padding: 10
    },

    modal: {
        margin: 'auto',
        padding: 25,
        maxWidth: 150,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    updateFailed: {
        flex: 1,
        justifyContent: 'space-between',
    }
})

// Configuration for how often we want to refresh?
const REFRESH_TIME = 120 // seconds

export default class ResultsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            updaterVisible: true,   // Handles whether updater modal is visible
            updateFailed: false,    // Handles whether "update failed" snackbar is shown
            data: {                 // The data that is returned from the API (defaults to null, overwritten later)
                date: null,
                freq: null,
                call: null,
                power_w: null,
                distance_km: null
            }
        }
    }

    // When the page is loaded, need to immediately fetch the data.
    componentDidMount = () => {
        this.getData()
    }

    getData = () => {
        console.log("Getting data...")

        // Clear both intervals so we can start from scratch.
        clearInterval(apiInterval);
        clearInterval(timerInterval);

        // Show the modal and change the updating text
        this.setState({
            updaterVisible: true,
            nextUpdate: "Updating..."
        })

        // Make the API call.
        axios.get('http://wspralert.herokuapp.com/api/scrape')
            .then(response => {
                console.log(response.data);

                if (!response.data.error) {
                    this.handleHappyPath(response.data);
                }

                this.setState({ nextUpdate: REFRESH_TIME })
            })
            .catch(error => {
                console.log(error)
                this.handleErrorResponse()
            })

    }

    handleHappyPath = (newData) => {
        var oldData = this.state.data;
        this.setState({
            data: newData[0],
            updaterVisible: false
        })

        // Should data be updated? If so, we'll send a notification.
        if (JSON.stringify(newData) !== JSON.stringify(oldData)) {
            console.log("NOTIFICATION!!!");
            this.setState({ updateFailed: false })
        }

        // Retry in {REFRESH_TIME} seconds.
        console.log(`Retry in ${REFRESH_TIME} seconds.`)
        this.setTimers(REFRESH_TIME * 1000);
    }

    handleErrorResponse = () => {
        console.log("Errored out...")
        this.setState({
            updaterVisible: false,
            updateFailed: true
        })

        // Retry in 10 seconds.
        console.log("Will retry in 10 seconds.")
        this.setTimers(10000);
        this.setState({ nextUpdate: 10 })
    }

    updateTimer = () => {
        if (!this.state.nextUpdate) {
            this.setState({ nextUpdate: REFRESH_TIME })
        } else {
            var nextUpdate = this.state.nextUpdate;
            this.setState({ nextUpdate: nextUpdate - 1 })
        }
    }

    setTimers = (interval) => {
        apiInterval = setInterval(this.getData, interval)
        timerInterval = setInterval(this.updateTimer, 1000)
    }
    
    handleDismissSnackbar = () => {
        console.log("Snackbar begone.")
        this.setState({ updateFailed: false })
    }


    render = () => {
        return (
            <View style={style.container}>
                <ResultsList nextUpdate={this.state.nextUpdate} data={this.state.data} />
                <Portal>
                    <Modal contentContainerStyle={style.modal} visible={this.state.updaterVisible} dismissable={false}>
                        <ActivityIndicator animating={true} />
                        <Text style={{ textAlign: "center", paddingTop: 10 }}>Updating...</Text>
                    </Modal>
                </Portal>

                <Portal>
                    <Snackbar
                        visible={this.state.updateFailed}
                        duration={5000}
                        onDismiss={this.handleDismissSnackbar}
                        action={{
                            label: 'OK',
                            onPress: () => this.handleDismissSnackbar
                        }}
                    >Update failed! Data may not be accurate.</Snackbar>
                </Portal>
            </View>
        )
    }
}