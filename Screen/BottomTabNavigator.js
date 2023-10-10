import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View} from 'react-native';
import Home from './Home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Activity from './Activity';
import Settings from './Settings';
import Rewards from './Rewards';
import Messages from './Messages';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator 
    screenOptions={{
        headerShown: false
      }}>
      <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        />
      <Tab.Screen name="Activity" component={Activity} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="note-edit-outline" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Rewards" component={Rewards} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Messages" component={Messages} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Settings" component={Settings} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}/>
    </Tab.Navigator>
  );
}

export default BottomTabs;

const styles = StyleSheet.create({});
