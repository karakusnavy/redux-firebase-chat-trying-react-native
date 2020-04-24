import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/FontAwesome";
import Chat from './src/chat/index'
import { Provider } from 'react-redux';
import configureStore from "./redux/reducers/configureStore"
import { currentPageReducers } from './redux/actions/currentPageAction'

const store = configureStore();

const getActiveRouteName = state => {
  const route = state.routes[state.index];

  if (route.state) {
    return getActiveRouteName(route.state);
  }

  return route.name;
};

const Tab = createBottomTabNavigator();



 

export default class App extends React.Component {


  

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer
          onStateChange={state => {

            const currentRouteName = getActiveRouteName(state);

            currentRouteName != 'Genel' ? store.dispatch(currentPageReducers(currentRouteName)) : null




          }}
        >
          <Tab.Navigator tabBarOptions={{ inactiveBackgroundColor: 'whitesmoke', inactiveTintColor: 'black', activeBackgroundColor: 'whitesmoke', activeTintColor: 'black' }}>
            <Tab.Screen options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons name="comment" color={'black'} size={26} />
              ),
            }} name="Chat" component={Chat} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

 