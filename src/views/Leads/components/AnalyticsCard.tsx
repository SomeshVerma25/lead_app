import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Target, CheckCircle2, Users, XCircle, Clock } from "lucide-react-native";

interface AnalyticsCardProps {
  lead: any;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ lead }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Lead Analytics</Text>
    <View style={styles.analyticsRow}>
      <Target size={20} color="#2ecc71" />
      <Text style={styles.analyticsText}>Match Score: {lead.matchScore}%</Text>
    </View>
    <View style={styles.analyticsRow}>
      <CheckCircle2 size={20} color="#3498db" />
      <Text style={styles.analyticsText}>Total Interactions: {lead.totalInteractions}</Text>
    </View>
    <View style={styles.analyticsRow}>
      <Users size={20} color="#f5a623" />
      <Text style={styles.analyticsText}>Nearby Leads: {lead.nearbyLeads}</Text>
    </View>
    <View style={styles.analyticsRow}>
      {lead.status === "Pending" ? (
        <Clock size={20} color="#f39c12" />
      ) : lead.status === "Approved" ? (
        <CheckCircle2 size={20} color="#2ecc71" />
      ) : (
        <XCircle size={20} color="#e74c3c" />
      )}
      <Text style={styles.analyticsText}>Status: {lead.status}</Text>
    </View>
  </View>
);

export default AnalyticsCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12 },
  analyticsRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  analyticsText: { marginLeft: 8, fontSize: 14, color: "#555" },
});
