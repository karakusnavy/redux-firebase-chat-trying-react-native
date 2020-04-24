import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, ImageBackground } from 'react-native'
import Header from './components/header'
import MaterialCommunityIcons from "react-native-vector-icons/FontAwesome";
import firebase from 'firebase';
//redux

import { connect } from "react-redux"


//-
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
class Chat extends React.Component {
    state = {
        message: '',
        myUsername: '',
        thisRoomName: '',
        messages: []
    }

    sendMessage() {
        firebase.database().ref('siber/rooms/' + this.props.exampleRedux.currentPageReducers + '/messages').push().set(
            {
                sender: this.props.exampleRedux.exampleReducers.userInfo.username,
                message: this.state.message,
                date: '12.56'
            }
        ).then(() => {
            this.setState({ message: '' })
        }).catch((error) => {
            console.log(error)
        })
    }



    componentDidMount() {
        this.props.navigation.addListener('focus', (e) => {

            var MessageList = []
            firebase.database().ref('siber/rooms/' + e.target.substring(0, e.target.indexOf('-')) + '/messages').on('value', (data) => {
                MessageList = []
                data.forEach(element => {

                    MessageList.push({
                        date: element.val().date,
                        message: element.val().message,
                        sender: element.val().sender,
                        id: element.key
                    })
                });
                this.setState({ messages: MessageList })
       
                 
            })
        });




    }


    render() {

        return (
            <ImageBackground style={{ flex: 1 }} source={require('../../assets/images/chatbackground.png')} >
                <Header yonlendirici={this.props.navigation} pagename={this.props.exampleRedux.currentPageReducers} />
                <ScrollView style={{ flex: 1 }} ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this.scrollView.scrollToEnd({ animated: true });
                    }}>


                    {
                        this.state.messages.map(item =>
                            item.sender == this.props.exampleRedux.exampleReducers.userInfo.username ?
                                <View key={item.id} style={{ flexDirection: 'column' }} >
                                    <View style={{ padding: 7, alignItems: 'flex-end', paddingBottom: 2 }} >
                                        <Text style={styles.myMessage} >{item.message}</Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-end', paddingRight: 7 }} >
                                        <Text style={{ color: 'gray' }} >{item.date}</Text>
                                    </View>
                                </View>
                                :
                                <View key={item.id} style={{ flexDirection: 'column' }} >
                                    <View style={{ padding: 7, alignItems: 'flex-start', paddingBottom: 2 }} >

                                        <Text style={styles.itMessage}>
                                            <Text style={{ fontWeight: 'bold' }} >{item.sender}: </Text>
                                            {item.message}
                                        </Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-start', marginLeft: 7 }} >
                                        <Text style={{ color: 'gray' }} >{item.date}</Text>
                                    </View>
                                </View>
                        )
                    }








                </ScrollView>
                <View style={{ height: 50, flexDirection: 'row', marginBottom: 10 }} >
                    <View style={{ flex: 4 }} >
                        <TextInput value={this.state.message} onChangeText={(text) => this.setState({ message: text })} style={styles.inputText} placeholder='Mesaj gir..' />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <TouchableOpacity onPress={() => this.sendMessage()} style={styles.sendButton} >
                            <MaterialCommunityIcons name="send" color={'white'} size={25} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    sendButton: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        borderRadius: 50 / 2
    },
    inputText: {
        borderRadius: 10,
        marginLeft: 10,
        paddingLeft: 10,
        elevation: 1,
        backgroundColor: 'white'
    },
    myMessage: {
        backgroundColor: 'whitesmoke',
        padding: 10,
        borderRadius: 10,
        elevation: 1
    },
    itMessage: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 10,
        elevation: 1
    }

})


function mapStateToProps(state) {


    return { exampleRedux: state }
}
export default connect(mapStateToProps)(Chat);