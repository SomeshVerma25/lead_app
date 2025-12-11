import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ViewToken,
} from "react-native";
import { Phone, Mail, Building2, BadgeCheck } from "lucide-react-native";

const { width } = Dimensions.get("window");

interface Lead {
  id: number;
  name: string;
  mobile: string;
  email: string;
  companyName: string;
  location: { lat: number; lng: number };
  matchScore: number;
  status: string;
  source: string;
  lastContacted: string;
}

interface Props {
  leads: Lead[];
  onSelect: (lead: Lead) => void;  // When tapped
  onFocus: (lead: Lead) => void;   // When scroll centers
}

const NearbyLeadsOverlay: React.FC<Props> = ({ leads, onSelect, onFocus }) => {
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 60, // at least 60% visible to count as focused
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].item) {
        onFocus(viewableItems[0].item as Lead);
      }
    }
  ).current;

  return (
    <View style={styles.overlay}>
      <FlatList
        data={leads}
        horizontal
        pagingEnabled
        snapToInterval={width * 0.7 + 20}
        decelerationRate="fast"
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => onSelect(item)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.company}>{item.companyName}</Text>

            <View style={styles.row}>
              <Phone size={16} color="#aeaeaeff" />
              <Text style={styles.info}>{item.mobile}</Text>
            </View>

            <View style={styles.row}>
              <Mail size={16} color="#aeaeaeff" />
              <Text style={styles.info}>{item.email}</Text>
            </View>

            <View style={styles.row}>
              <Building2 size={16} color="#aeaeaeff" />
              <Text style={styles.info}>Source: {item.source}</Text>
            </View>

            <View style={styles.bottomRow}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>

              <View style={styles.matchBadge}>
                <BadgeCheck size={14} color="#aeaeaeff" />
                <Text style={styles.matchText}>{item.matchScore}%</Text>
              </View>
            </View>

            <Text style={styles.lastContact}>
              Last contacted: {item.lastContacted}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NearbyLeadsOverlay;


const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    zIndex: 99,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: width * 0.7,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginRight: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2a2a2aff",
  },
  company: {
    color: "#818181ff",
    marginBottom: 8,
    marginTop: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  info: {
    color: "#555555ff",
    marginLeft: 8,
    fontSize: 13,
  },
  bottomRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  statusBadge: {
    backgroundColor: "#3498db",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  matchBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#27ae60",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  matchText: {
    fontSize: 12,
    color: "#fff",
    marginLeft: 4,
    fontWeight: "700",
  },
  lastContact: {
    marginTop: 10,
    color: "#585757ff",
    fontSize: 11,
  },
});
