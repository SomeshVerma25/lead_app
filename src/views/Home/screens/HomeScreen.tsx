import { Alert, Linking, PermissionsAndroid, Platform, StyleSheet, View } from "react-native";
import HomeHeader from "../components/HomeHeader";
import SearchFilterSortBar from "../components/SearchFilterSortBar";
import DashboardAnalytics from "../components/DashboardAnalytics";
import { leadsData } from "../../../utils/leads";
import { useEffect, useState } from "react";
import LeadCard from "../components/LeadCard";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LocationService from "../../../services/LocationService";
import EventEmitterService from "../../../services/EventEmitterService";

const HomeScreen: React.FC = () => {
  const [search, setSearch] = useState("");
  const [list, setList] = useState<any[]>([]);
  const navigation: any = useNavigation()

  useEffect(() => {
    setList(leadsData);
    setUpLocation()
  }, []);

  const openAppSettings = () => {
    Linking.openSettings().catch(() => {
      // Alert.alert("Error", "Unable to open settings");
    });
  };

  const setUpLocation = async () => {
    const result = await requestLocationPermission();
    if (result === "granted") {
      LocationService.start();
      LocationService.addListener((location) => {
        console.log("Location", location);
      })
      return;
    }
    if (result === "never_ask_again") {
      Alert.alert(
        "Enable Location",
        "You have disabled location permission permanently. Please enable it manually from settings.",
        [
          {
            text: "Open Settings",
            onPress: openAppSettings,
          },
        ]
      );
      return;
    }
    Alert.alert(
      "Location Permission Required",
      "Please enable location access for the app to function correctly.",
      [
        { text: "Retry", onPress: () => setUpLocation() },
        { text: "Open Settings", onPress: openAppSettings },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "App needs your location to show nearby leads.",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return "granted";
        }
        if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          return "never_ask_again";
        }
        return "denied";
      } catch (err) {
        console.warn(err);
        return "denied";
      }
    }
    return "granted";
  };

  const renderHeader = () => (
    <>
      <View style={{ paddingVertical: 12 }}>
        <DashboardAnalytics
          total={150}
          highMatch={46}
          nearby={32}
          declined={21}
          assigned={18}
          pending={9}
        />
      </View>
      <SearchFilterSortBar
        value={search}
        onChangeText={setSearch}
        onSortPress={() => console.log("Sort")}
        onFilterPress={() => console.log("Filter")}
        onRightAction={() => console.log("Mic / Scan / Filter Right Btn")}
      />
    </>
  );

  const handleNotificationPress = () => {
    EventEmitterService.emit('notification', 
      {"id":1,"name":"Amit Sharma","mobile":"+91-981000001","email":"amit.sharma@example.com","companyName":"TechSolutions","location":{"lat":28.4595,"lng":77.0266},"matchScore":82,"status":"Assigned","source":"Website","lastContacted":"2025-12-10"},
    )
  };

  return (
    <View style={styles.container}>
      <HomeHeader
        onProfilePress={() => console.log("Profile")}
        onNotificationPress={handleNotificationPress}
        onSettingsPress={() => console.log("Settings")}
      />
      <FlatList
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <LeadCard lead={item} onPress={() => navigation.navigate("LeadDetails", { lead: item })} />}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 12 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
