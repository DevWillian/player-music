import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AudioList from '../AudioList';
import Player from '../Player';
import PlayList from '../PlayList';
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator()

const AppNavigator = () => {
  return <Tab.Navigator>
    <Tab.Screen name='AudioList' component={AudioList}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="headset" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen name='Player' component={Player}
      options={{
        tabBarIcon: ({ color, size }) => (
          <SimpleLineIcons name="disc" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen name='PlayList' component={PlayList}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="playlist-music" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
}


export default AppNavigator;