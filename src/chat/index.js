import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { connect } from "react-redux"
import Login from './login'
import Chat from './chat'
import Join from './join'

import Genel from '../genel'
function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

const Drawer = createDrawerNavigator();

class App extends React.Component {
    state = {
        login: false
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
            <Drawer.Screen key={item.Name} name={item.Name} component={Chat} />

        )
    }

    render() {
        return (
            <Drawer.Navigator initialRouteName="Genel">

                {

                    this.props.exampleRedux.exampleReducers.userInfo.login == true ?
                        <>
                            <Drawer.Screen name="Genel" component={Genel} />
                            {
                                this.renderLa(this.props.exampleRedux.exampleReducers.Rooms)

                            }
                            <Drawer.Screen name="Kanala Katıl" component={Join} />
                            <Drawer.Screen name="İsim Değiştir" component={Login} />
                        </>

                        :

                        <Drawer.Screen name="Giriş" component={Login} />


                }

            </Drawer.Navigator>
        )
    }
}

function mapStateToProps(state) {


    return { exampleRedux: state }
}


export default connect(mapStateToProps)(App);