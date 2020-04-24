import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Header from './components/header'
import MaterialCommunityIcons from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux"
import { exampleReducers } from '../../redux/actions/exampleAction'
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "",
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
class Login extends React.Component {
    state = {
        username: ''
    }


    login = async () => {

   

        var RoomList = []
 
        firebase.database().ref('siber/rooms').on('value', (data) => {


            data.forEach(element => {
                if (JSON.stringify(element.val()).indexOf('"' + this.state.username + '"') != -1) {
                    RoomList.push({ Name: element.key })
                }
            });

        })
        RoomList.push({ Name: 'Radyo' })
        var UserInfo = {
            Rooms: RoomList,
            userInfo: { username: this.state.username, login: true },
            currentRoomName: 'Genel'
        }
        this.props.dispatch(exampleReducers(UserInfo))

        alert('İşlem Başarılı')
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <Header yonlendirici={this.props.navigation} />
                <View style={styles.container} >
                    <MaterialCommunityIcons name="users" color={'black'} size={100} />
                    <Text style={{ marginTop: 10 }} >Lütfen Giriş Yapınız</Text>
                    <TextInput onChangeText={(text) => this.setState({ username: text })} style={styles.inputstyle} placeholder='Nickname' />

                    <TouchableOpacity onPress={() => this.login()} style={styles.buttonstyle} >
                        <Text style={{ color: 'white' }} >
                            Giriş Yap
                        </Text>
                    </TouchableOpacity>


                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    inputstyle: {
        backgroundColor: 'whitesmoke',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 85,
        paddingRight: 85,
        borderRadius: 10,
        elevation: 2,
        marginTop: 10
    },
    buttonstyle: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 10,
        elevation: 2,
        marginTop: 10,

    }

})



function mapStateToProps(state, dispatch) {

    return { exampleRedux: state, actions: bindActionCreators(exampleReducers, dispatch) }
}


export default connect(mapStateToProps, null)(Login);