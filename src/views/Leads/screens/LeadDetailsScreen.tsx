import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ProfileCard from "../components/ProfileCard";
import AnalyticsCard from "../components/AnalyticsCard";
import LocationCard from "../components/LocationCard";
import ActionCard from "../components/ActionCard";
import LeadDetailHeader from "../components/LeadDetailHeader";
import { useRoute } from "@react-navigation/native";

const LeadDetailScreen: React.FC = () => {
    const routes:any = useRoute()
    const [lead, setLead] = useState<any | null>()

    useEffect(() => {
        setLead(routes.params?.lead)
    },[])

  return (
    <ScrollView style={styles.container}>
      <LeadDetailHeader title={lead?.name} />
      {
        lead &&
            <View style={styles.contentContaienr}>
        <ProfileCard lead={lead} />
        <ActionCard lead={lead} />
        <AnalyticsCard lead={lead} />
        <LocationCard lead={lead} />
      </View>
      }
    </ScrollView>
  );
};

export default LeadDetailScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "#f8f9fa"
},
contentContaienr:{
    paddingHorizontal: 16,
    paddingVertical: 14,
}
});
