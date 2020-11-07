
import React, { Component } from 'react';
import { Text, View, Modal } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';

var apiInterval, timerInterval;

// Configuration for how often we want to refresh?
const REFRESH_TIME = 120 // seconds

const styles = {
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "lightgrey",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowRadius: 3.84,
        elevation: 5
    },
}

export default class Record extends Component {

    // notificationSystem = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            next_update_time: null,
            update_failed: null,
            modalVisible: false
        };
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible })
    }

    componentDidMount() {
        // Make an API call and - by extension - start up all the timers.
        this.makeAPICall();
    }

    componentWillUnmount() {
        // On refresh, or when this page isn't visible anymore, clear the timers so they don't overlap with each other.
        clearInterval(apiInterval)
        clearInterval(timerInterval)
    }

    makeAPICall() {
        // Make sure we're killing the timers.
        clearInterval(timerInterval);
        clearInterval(apiInterval);

        // Set the "update" text to "Updating..."
        this.setState({
            next_update_text: "Updating...",
            next_update_time: null,
            modalVisible: !this.state.modalVisible
        })

        // Make the API call.
        // fetch('http://localhost:5000/api/scrape')
        //     .then(response => response.json())  // Ensure we're getting data as JSON
        //     .then(data => {                     // Process the data, set it as the state 
        //         console.log(data);

        //         if (data.error) {
        //             this.handleErrorResponse();
        //             this.connectionErrorNotification();
        //             this.setTimers(5000)
        //         } else {
        //             this.handleHappyPath(data);
        //             this.updateNotification();
        //             this.setTimers(REFRESH_TIME * 1000)
        //         }
        //     })

        axios.get('http://wspralert.herokuapp.com/api/scrape')
            .then(response => {
                console.log(response.data);

                if (response.data.error) {
                    this.handleErrorResponse();
                    // this.connectionErrorNotification();
                    this.setTimers(5000);
                } else {
                    this.handleHappyPath(response.data);
                    this.setTimers(REFRESH_TIME * 1000)
                }

                this.setState({ modalVisible: !this.state.modalVisible })
            })
    }

    handleHappyPath(newData) {
        var oldData = this.state.data;

        this.setState({
            data: newData,
            next_update_text: "Next update in",
            next_update_time: REFRESH_TIME
        });

        if (JSON.stringify(newData) !== JSON.stringify(oldData)) {
            console.log(`Data is NOT the same. Old data: ${JSON.stringify(oldData)}, new data: ${JSON.stringify(newData)}`)
            // this.updateNotification();
        } else {
            console.log(`Data is the same. Old data: ${JSON.stringify(oldData)}, new data: ${JSON.stringify(newData)}`)
        }

        console.log("Data state looks like this.");
        console.log(this.state.data)
    }

    handleErrorResponse() {
        this.setState({
            update_failed: "The last update failed! Information may be out of date!",
            next_update_text: "Next update in",
            next_update_time: 5
        })
    }

    // sendNotification() {
    //     this.updateNotification()
    // }

    nextUpdateTimer() {
        // Count down from 30. This is called every second, so subtract 1 every time it's called
        this.setState({
            next_update_time: this.state.next_update_time - 1
        })
    }

    setTimers(interval) {
        apiInterval = setInterval(() => {   // After REFRESH_TIME seconds, want to call this API again.
            console.log("Updating.")
            this.makeAPICall()
        }, interval);

        timerInterval = setInterval(() => { // Every second, want to update the "next update" text.
            this.nextUpdateTimer()
        }, 1000);
    }

    render() {
        return (
            <Text>Yes.</Text>
        )
    }
}
