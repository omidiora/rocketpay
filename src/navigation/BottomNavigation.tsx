import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WalletTab from '../screen/Dashboard/WalletTab';
import HomeAddress from '../screen/Dashboard/HomeAddress';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR } from '../util/Textutils';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={WalletTab}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({color, size ,focused}) => (
            <Ionicons name="home" color={focused ? COLOR.green :"grey"} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Location"
        component={HomeAddress}
        options={{
          tabBarLabel: 'Location',
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons name="location" color={focused ? COLOR.green :"grey"} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomNavigation;
