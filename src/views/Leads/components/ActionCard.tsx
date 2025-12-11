import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Phone, Mail, CheckCircle2 } from "lucide-react-native";

interface ActionCardProps {
  lead: any;
}

const ActionCard: React.FC<ActionCardProps> = ({ lead }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Actions</Text>
    <View style={styles.row}>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#2ecc71" }]}>
        <Phone size={20} color="#fff" />
        <Text style={styles.btnText}>Call</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#3498db" }]}>
        <Mail size={20} color="#fff" />
        <Text style={styles.btnText}>Message</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#f39c12" }]}>
        <CheckCircle2 size={20} color="#fff" />
        <Text style={styles.btnText}>Assign</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default ActionCard;

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
  row: { flexDirection: "row", justifyContent: "space-around", marginTop: 8 },
  button: { flexDirection: "row", alignItems: "center", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12 },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 14, marginLeft: 6 },
});
