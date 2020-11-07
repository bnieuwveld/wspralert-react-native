import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Text } from 'react-native-paper'

export default class ResultsList extends Component {
    render() {
        const dynamicData = this.props.data;
        return (
            <View>
            {/* {this.props.data.map((dynamicData, i) => */}
                    <List.Section>
                        <List.Subheader>Most Recent Call</List.Subheader>

                        <List.Item title={dynamicData.date} description="Date" left={props => <List.Icon {...props} icon="calendar" />} />

                        <List.Item title={dynamicData.freq} description="Frequency" left={props => <List.Icon {...props} icon="radio" />} />

                        <List.Item title={dynamicData.call} description="Callsign" left={props => <List.Icon {...props} icon="phone" />} />

                        <List.Item title={dynamicData.power_w} description="Power (W)" left={props => <List.Icon {...props} icon="wifi" />} />

                        <List.Item title={dynamicData.distance_km} description="Distance (km)" left={props => <List.Icon {...props} icon="map-marker-distance" />} />

                        <List.Item title={this.props.nextUpdate} description="Seconds until next update" left={props => <List.Icon {...props} icon="update" />} />
                    </List.Section>
            </View>
        )
    }
}