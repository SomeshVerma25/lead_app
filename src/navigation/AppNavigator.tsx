import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from "../views/Chat/screens/ChatScreen";
import HomeScreen from "../views/Home/screens/HomeScreen";
import BottomBar from "../views/common/bottomBars/BottomBar";
import MapScreen from '../views/Map/screens/MapScreen';
import CardScanScreen from '../views/Scan/screens/CardScanScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LeadDetailScreen from '../views/Leads/screens/LeadDetailsScreen';
import { useEffect, useState } from 'react';
import LocationService from '../services/LocationService';
import ScanDetailScreen from '../views/Scan/screens/ScanDetailScreen';
import LeadIncomingScreen from '../views/Notification/screens/LeadIncomingScreen';
import { StyleSheet, View } from 'react-native';
import EventEmitterService from '../services/EventEmitterService';

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const LoggedInUserNaviator = () => (
  <Stack.Navigator initialRouteName='Dashboard'>
    <Stack.Screen options={{headerShown: false}} name="Dashboard" component={UserHomeTabNavigator} />
    <Stack.Screen options={{headerShown: false}} name="LeadDetails" component={LeadDetailScreen} />
    <Stack.Screen options={{headerShown: false}} name="ScanDetails" component={ScanDetailScreen} />

  </Stack.Navigator>
)

const UserHomeTabNavigator: React.FC = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      tabBar={(props) => <BottomBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Chat" component={ChatScreen} />
      <Tabs.Screen name="Map" component={MapScreen} />
      <Tabs.Screen name="Scan" component={CardScanScreen} />
      {/* <Tabs.Screen name="Alerts" component={AlertScreen} /> */}
    </Tabs.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  const [notification, setNotification] = useState<any>(false)

  useEffect(() => {
    EventEmitterService.on('notification', (data) => {
      setNotification(data)
    });
    return () => {
      EventEmitterService.off('notification');
    };
  },[])

  const onCloseRequest = () => {
    setNotification(null)
  }


  return (
    <NavigationContainer>
      <LoggedInUserNaviator />
      {notification && (
        <View
          style={styles.notificationOverlay}
        >
          <LeadIncomingScreen
            onCloseRequest={onCloseRequest}
            data={notification}
          />
        </View>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  notificationOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    paddingVertical: 62,
    paddingHorizontal: 16,
    borderRadius: 12,
  }
})

export default AppNavigator;
