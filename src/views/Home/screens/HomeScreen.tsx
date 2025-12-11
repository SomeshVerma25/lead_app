import { StyleSheet, View } from "react-native";
import HomeHeader from "../components/HomeHeader";
import SearchFilterSortBar from "../components/SearchFilterSortBar";
import DashboardAnalytics from "../components/DashboardAnalytics";
import { leadsData } from "../../../utils/leads";
import { useEffect, useState } from "react";
import LeadCard from "../components/LeadCard";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen: React.FC = () => {
  const [search, setSearch] = useState("");
  const [list, setList] = useState<any[]>([]);
  const navigation:any = useNavigation()

  useEffect(() => {
    setList(leadsData);
  }, []);

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

  return (
    <View style={styles.container}>
      <HomeHeader
        onProfilePress={() => console.log("Profile")}
        onNotificationPress={() => console.log("Notifications")}
        onSettingsPress={() => console.log("Settings")}
      />
      <FlatList
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <LeadCard lead={item} onPress={() => navigation.navigate("LeadDetails", { lead: item })}/>}
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
