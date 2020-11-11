import React, { Component, useState } from 'react';
import { StatusBar } from 'react-native';
import { Appbar, Portal, Text, Modal } from 'react-native-paper';
import Options from './Options';

const HeaderBar = () => {
    const [optionsVisible, setOptionsVisible] = useState(false)

    return (
        <Appbar.Header dark={true}>
            <Appbar.Action icon="settings" onPress={() => setOptionsVisible(true)} />
            <Appbar.Content title="WsprAlert" subtitle="See the latest results from Wsprnet." />

            <Options visible={optionsVisible} onModalDismiss={() => setOptionsVisible(false)} />
        </Appbar.Header>
    )
}

export default HeaderBar;