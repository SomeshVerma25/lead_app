import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Phone, Mail } from "lucide-react-native";

interface ProfileCardProps {
  lead: any;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ lead }) => (
  <View style={styles.card}>
    <View style={styles.profileRow}>
      <Image
        source={require("../../../assets/images/profile.png")}
        style={styles.profileImage}
      />
      <View style={{ marginLeft: 12 }}>
        <Text style={styles.name}>{lead.name}</Text>
        <Text style={styles.company}>{lead.companyName}</Text>
      </View>
    </View>
    <View style={styles.contactRow}>
      <Phone size={16} color="#555" />
      <Text style={styles.contactText}>{lead.mobile}</Text>
    </View>
    <View style={styles.contactRow}>
      <Mail size={16} color="#555" />
      <Text style={styles.contactText}>{lead.email}</Text>
    </View>
  </View>
);

export default ProfileCard;

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
  profileRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  profileImage: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#ccc" },
  name: { fontSize: 17, fontWeight: "700", color: "#2c3e50" },
  company: { fontSize: 14, color: "#555", marginTop: 2 },
  contactRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  contactText: { marginLeft: 8, fontSize: 14, color: "#555" },
});
