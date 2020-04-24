import { View, Text } from 'react-native'
import React from 'react'
import 'react-native-get-random-values';

import { WebView } from 'react-native-webview'

export default class Index extends React.Component {
    render() {
        return (
            <WebView style={{ flex: 1 }} source={{ uri: 'https://www.siber.net/' }} />
        )
    }
}