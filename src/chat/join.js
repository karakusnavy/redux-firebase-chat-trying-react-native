import React from 'react'
import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Header from './components/header'
import MaterialCommunityIcons from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux"
import { exampleReducers } from '../../redux/actions/exampleAction'
import { bindActionCreators } from 'redux';
import firebase from 'firebase';

var firebaseConfig = {
    apiKey: " ",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
class Join extends React.Component {
    state = {
        channel: ''
    }
    addNewMenu = async () => {
       
        var Rooms = this.props.exampleRedux.exampleReducers.Rooms
        Rooms.push({ Name: this.state.channel })
 
        var UserInfo = {
            Rooms: Rooms,
            userInfo: { username: this.props.exampleRedux.exampleReducers.userInfo.username, login: this.props.exampleRedux.exampleReducers.userInfo.login },
            currentRoomName: 'Genel'
        }

        console.log(this.props.exampleRedux.exampleReducers)
        await firebase.database().ref('siber/rooms/' + this.state.channel + '/messages').push().set(
            {


                date: '00:00',
                message: this.props.exampleRedux.exampleReducers.userInfo.username + ' Odaya Katıldı',
                sender: this.props.exampleRedux.exampleReducers.userInfo.username


            }
        ).then(() => {


        }).catch((error) => {
        })
        await firebase.database().ref('siber/rooms/' + this.state.channel + '/users').push().set(
            {


                username: this.props.exampleRedux.exampleReducers.userInfo.username

            }
        ).then(() => {
            alert('Oda Oluşturuldu')

        }).catch((error) => {
        })


    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <Header pagename='Kanala Katıl' yonlendirici={this.props.navigation} />
                <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} source={require('../../assets/images/background.jpg')} >
                    <TextInput onChangeText={(text) => this.setState({ channel: text })} placeholder='Kanal ismi giriniz..' style={styles.input} />

                    <View style={{ width: '60%', alignItems: 'flex-end' }} >
                        <TouchableOpacity onPress={() => this.addNewMenu()} style={styles.button} >
                            <MaterialCommunityIcons name="check" color={'black'} size={26} />
                            <Text>Katıl</Text>
                        </TouchableOpacity>
                    </View>

                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '60%',
    },
    button: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
        marginTop: 10,
        borderRadius: 10
    }
})


function mapStateToProps(state, dispatch) {

    return { exampleRedux: state, actions: bindActionCreators(exampleReducers, dispatch) }
}


export default connect(mapStateToProps, null)(Join);