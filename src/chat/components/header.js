import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/FontAwesome";

export default class header extends React.Component {
    render() {

        return (
            <View style={styles.header} >
                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                    <TouchableOpacity onPress={() => this.props.yonlendirici.openDrawer()} >
                        <MaterialCommunityIcons name="navicon" color={'black'} size={26} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }} >{this.props.pagename}</Text>
                </View>
                
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <MaterialCommunityIcons name="info-circle" color={'black'} size={25} />
                        <Text style={{ fontWeight: 'bold', fontSize: 12 }} >
                            Oda Bilgisi
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: 'whitesmoke',
        elevation: 4,
        padding: 10,
        justifyContent: 'center',
        flexDirection: 'row'
    }
})