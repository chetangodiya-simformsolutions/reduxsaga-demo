import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Navigations } from '../constants';

import HomeScreen from '../modules/Home/HomeScreen';
import PostScreen from '../modules/Post/PostScreen';
import { navigationRef } from './NavigationRefs';

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name={Navigations.Home} component={HomeScreen} />
    <HomeStack.Screen name={Navigations.Post} component={PostScreen} />
  </HomeStack.Navigator>
);

const RootStack = createStackNavigator();
function AppNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen name={Navigations.Auth} component={HomeStackScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
