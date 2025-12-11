import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from "../views/Chat/screens/ChatScreen";
import HomeScreen from "../views/Home/screens/HomeScreen";
import BottomBar from "../views/common/bottomBars/BottomBar";
import MapScreen from '../views/Map/screens/MapScreen';
import CardScanScreen from '../views/Scan/screens/CardScanScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LeadDetailScreen from '../views/Leads/screens/LeadDetailsScreen';

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const LoggedInUserNaviator = () => (
  <Stack.Navigator initialRouteName='Dashboard'>
    <Stack.Screen options={{headerShown: false}} name="Dashboard" component={UserHomeTabNavigator} />
    <Stack.Screen options={{headerShown: false}} name="LeadDetails" component={LeadDetailScreen} />
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
  return (
    <NavigationContainer>
      <LoggedInUserNaviator />
    </NavigationContainer>
  );
};

export default AppNavigator;
