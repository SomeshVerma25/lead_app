import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Building2, Phone, Mail, MapPin, Clock } from "lucide-react-native";

interface LeadProps {
  lead: any;
  onPress: () => void;
}

const LeadCard: React.FC<LeadProps> = ({ lead, onPress }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted": return "#2ecc71";
      case "Pending": return "#f5a623";
      case "Declined": return "#e74c3c";
      case "Assigned": return "#3498db";
      default: return "#95a5a6";
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return "#1e7d3f";
    if (score >= 80) return "#1c4e80";
    return "#666";
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { borderLeftColor: getStatusColor(lead.status) }
      ]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{lead.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(lead.status) }]}>
          <Text style={styles.statusText}>{lead.status}</Text>
        </View>
      </View>

      <View style={styles.groupBox}>
        <View style={styles.row}>
          <Building2 size={16} color="#555" />
          <Text style={styles.info}>{lead.companyName}</Text>
        </View>

        <View style={styles.row}>
          <Phone size={16} color="#555" />
          <Text style={styles.info}>{lead.mobile}</Text>
        </View>

        <View style={styles.row}>
          <Mail size={16} color="#555" />
          <Text style={styles.info}>{lead.email}</Text>
        </View>

        <View style={styles.row}>
          <MapPin size={16} color="#555" />
          <Text style={styles.info}>
            {lead.location.lat.toFixed(3)}, {lead.location.lng.toFixed(3)}
          </Text>
        </View>

        <View style={styles.row}>
          <Clock size={16} color="#555" />
          <Text style={styles.info}>Last: {lead.lastContacted}</Text>
        </View>
      </View>

      <View
        style={[
          styles.matchBox,
          { backgroundColor: getMatchColor(lead.matchScore) }
        ]}
      >
        <Text style={styles.matchText}>Match Score</Text>
        <Text style={styles.matchValue}>{lead.matchScore}%</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LeadCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginVertical: 8,
    marginHorizontal: 12,
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2c3e50"
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12
  },
  statusText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12
  },
  groupBox: {
    backgroundColor: "#f7f7f7",
    padding: 10,
    borderRadius: 10,
    marginTop: 4,
    marginBottom: 12
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6
  },
  info: {
    marginLeft: 6,
    fontSize: 14,
    color: "#555"
  },
  matchBox: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  matchText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600"
  },
  matchValue: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800"
  }
});
