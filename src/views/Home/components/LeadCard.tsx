import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Building2, Phone, Mail, MapPin, CheckCircle2, Clock, XCircle } from "lucide-react-native";

interface LeadProps {
  lead: any;
  onPress: () => void;
}

const LeadCard: React.FC<LeadProps> = ({ lead , onPress}) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Accepted": return "#2ecc71";
      case "Pending": return "#f5a623";
      case "Declined": return "#e74c3c";
      case "Assigned": return "#3498db";
      default: return "#95a5a6";
    }
  };

  return (
    <TouchableOpacity style={[styles.card, { borderLeftColor: getStatusColor(lead.status) }]}
        onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{lead.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(lead.status) }]}>
          <Text style={styles.statusText}>{lead.status}</Text>
        </View>
      </View>
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
        <Text style={styles.info}>{lead.location.lat.toFixed(3)}, {lead.location.lng.toFixed(3)}</Text>
      </View>
      <View style={styles.row}>
        <Clock size={16} color="#555" />
        <Text style={styles.info}>Last: {lead.lastContacted}</Text>
      </View>
      <View style={styles.matchRow}>
        <Text style={styles.matchLabel}>Match Score:</Text>
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
    marginBottom: 8
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2c3e50"
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12
  },
  statusText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4
  },
  info: {
    marginLeft: 6,
    fontSize: 14,
    color: "#555"
  },
  matchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8
  },
  matchLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333"
  },
  matchValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2ecc71"
  }
});
