import React, { Component, useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import ResultsList from './ResultsList';
import axios from 'axios'
import { Snackbar, Portal, ActivityIndicator, Modal, Text, HelperText } from 'react-native-paper';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

var apiInterval, timerInterval;

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
            updaterVisible: true,
            updateFailed: false,
            data: {
                date: null,
                freq: null,
                call: null,
                power_w: null,
                distance_km: null
            }
        }
    }

    handleDismissSnackbar = () => {
        console.log("Snackbar begone.")
        this.setState({ updateFailed: false })
    }

    componentDidMount = () => {
        this.getData()
    }

    getData = () => {
        console.log("Getting data...")

        clearInterval(apiInterval);
        clearInterval(timerInterval);

        this.setState({
            updaterVisible: true,
            nextUpdate: "Updating..."
        })

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
        this.setState({nextUpdate: 10})
    }

    updateTimer = () => {
        if (!this.state.nextUpdate) {
            this.setState({nextUpdate: REFRESH_TIME})
        } else {
            var nextUpdate = this.state.nextUpdate;
            this.setState({nextUpdate: nextUpdate - 1})
        }
    }

    setTimers = (interval) => {
        apiInterval = setInterval(this.getData, interval)
        timerInterval = setInterval(this.updateTimer, 1000)
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