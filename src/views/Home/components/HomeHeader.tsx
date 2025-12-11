import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  Bell,
  Settings,
  UserCircle,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HomeHeaderProps {
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
  onSettingsPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  onProfilePress,
  onNotificationPress,
  onSettingsPress,
}) => {
  const inset = useSafeAreaInsets()
  return (
    <View style={[styles.container, {
      paddingTop: inset.top
    }]}>
      <Text style={styles.title}>LeadApp</Text>
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.iconBtn} onPress={onNotificationPress}>
          <Bell size={22} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={onSettingsPress}>
          <Settings size={22} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={onProfilePress}>
          <UserCircle size={26} color="#222" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e272e",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    marginLeft: 14,
    padding: 6,
  },
});
