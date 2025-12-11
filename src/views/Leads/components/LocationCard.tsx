import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { MapPin, Navigation } from "lucide-react-native";

interface LocationCardProps {
  lead: any;
}

const LocationCard: React.FC<LocationCardProps> = ({ lead }) => {
  const openMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lead.location.lat},${lead.location.lng}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Location</Text>
      <View style={styles.row}>
        <MapPin size={20} color="#e74c3c" />
        <Text style={styles.text}>
          Lat: {lead.location.lat.toFixed(4)}, Lng: {lead.location.lng.toFixed(4)}
        </Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={openMaps}>
        <Navigation size={16} color="#fff" />
        <Text style={styles.btnText}>Get Directions</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationCard;

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
  row: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  text: { marginLeft: 8, fontSize: 14, color: "#555" },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 6,
  },
});
