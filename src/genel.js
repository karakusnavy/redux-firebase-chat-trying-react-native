import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import Header from './chat/components/header'
import { connect } from "react-redux"
import AsyncStorage from '@react-native-community/async-storage';
import { exampleReducers } from '../redux/actions/exampleAction'
import { bindActionCreators } from 'redux';
class Genel extends React.Component {
    componentDidMount = async () => {
        console.log(this.props.exampleRedux.exampleReducers.userInfo.login)
        await AsyncStorage.getItem('username').then(value => {
            if (value != null) {
                // giriş yapmış

            }
        })
    }
    renderLa(gelenRooms) {
        console.log(gelenRooms)
        var flags = [], output = [], l = gelenRooms.length, i;
        for (i = 0; i < l; i++) {
            if (flags[gelenRooms[i].Name]) continue;
            flags[gelenRooms[i].Name] = true;
            output.push({ Name: gelenRooms[i].Name });
        }
        console.log(output)

        return output.map(item =>
            <TouchableOpacity onPress={() => this.props.navigation.navigate(item.Name)} key={item.Name} >
                <ImageBackground style={styles.cardView} source={require('../assets/images/chatbackground.png')} >
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }} >{item.Name}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={{ flex: 1 }} >
                <Header yonlendirici={this.props.navigation} pagename="Genel" />
                <ScrollView>
                    <Text style={{ fontWeight: 'bold', margin: 10 }} >
                        Kanallar
                </Text>
                    {
                        this.renderLa(this.props.exampleRedux.exampleReducers.Rooms)
                    }
                    <Text style={{ fontWeight: 'bold', margin: 10 }} >
                        Duyurular
                    </Text>


                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    cardView: {
        margin: 10,
        marginBottom: 0,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
function mapStateToProps(state) {


    return { exampleRedux: state }
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(exampleReducers, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Genel);