import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface LeadDetailHeaderProps {
  title: string;
}

const LeadDetailHeader: React.FC<LeadDetailHeaderProps> = ({ title }) => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets()

  return (
    <View style={[styles.container, {
        paddingTop: inset.top
    }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <ArrowLeft size={24} color="#000000ff" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default LeadDetailHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  backBtn: {
    marginRight: 12,
  },
  title: {
    color: "#000000ff",
    fontSize: 18,
    fontWeight: "700",
  },
});
