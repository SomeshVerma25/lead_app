import React from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { Users, Target, MapPin, XCircle } from "lucide-react-native";

interface AnalyticsProps {
  total: number;
  highMatch: number;
  nearby: number;
  declined: number;
  assigned?: number;
  pending?: number;
}

const DashboardAnalytics: React.FC<AnalyticsProps> = ({
  total,
  highMatch,
  nearby,
  declined,
  assigned,
  pending
}) => {
  const items = [
    {
      label: "Total Leads",
      value: total,
      color: "#4a90e2",
      Icon: Users,
      subtitle: "All Leads"
    },
    {
      label: "High Match",
      value: highMatch,
      color: "#2ecc71",
      Icon: Target,
      subtitle: "Best Matches"
    },
    {
      label: "Nearby",
      value: nearby,
      color: "#f5a623",
      Icon: MapPin,
      subtitle: "Close Leads"
    },
    {
      label: "Declined",
      value: declined,
      color: "#e74c3c",
      Icon: XCircle,
      subtitle: "Rejected Leads"
    }
  ];

  const cardWidth = Dimensions.get("window").width / 2.6;

  const renderItem = ({ item }: any) => {
    const Icon = item.Icon;
    return (
      <View style={[styles.card, { width: cardWidth, backgroundColor: item.color }]}>
        <View style={styles.iconRow}>
          <Icon size={22} color="#fff" />
          <View
            style={[
              styles.countBadge,
              { backgroundColor: item.color + "100" } // slightly lighter transparent background
            ]}
          >
            <Text style={styles.countText}>{item.value}</Text>
          </View>
        </View>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={items}
      horizontal
      keyExtractor={(item) => item.label}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
    />
  );
};

export default DashboardAnalytics;

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 14,
    justifyContent: "center"
  },
  iconRow: {
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center",
    marginBottom: 8
  },
  countBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2
  },
  countText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14
  },
  label: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "700"
  },
  subtitle: {
    fontSize: 12,
    color: "#f0f0f0",
    marginTop: 2
  }
});
