import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from "react-native";
import { Bell, Settings, UserCircle } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


interface ViewProp {
  onNotificationPress: () => void;
}

const HomeHeader: React.FC<ViewProp> = ({ onNotificationPress }) => {
  const inset = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      <View
        style={[styles.container, {
          paddingTop: inset.top,
        }]}
      >
        <Text style={styles.title}>LeadApp</Text>
        <View style={styles.rightContainer}>
          <TouchableOpacity style={styles.iconBtn} onPress={onNotificationPress}>
            <Bell size={22} color="#222" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setMenuVisible(true)}>
            <UserCircle size={26} color="#222" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={menuVisible} transparent animationType="slide">
        <TouchableOpacity style={styles.overlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuBox}>
            <View style={styles.profileRow}>
              <Image
                source={{ uri: "https://i.pravatar.cc/100" }}
                style={styles.profileImg}
              />
              <View>
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileRole}>Sales Executive</Text>
              </View>
            </View>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.row}>
                <UserCircle size={18} color="#222" />
                <Text style={styles.menuText}>Profile</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.separator} />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.row}>
                <Settings size={18} color="#222" />
                <Text style={styles.menuText}>Settings</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.separator} />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.row}>
                <Bell size={18} color="#222" />
                <Text style={styles.menuText}>Help & Support</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.separator} />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.row}>
                <UserCircle size={18} color="#d63031" />
                <Text style={[styles.menuText, { color: "#d63031" }]}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

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
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  menuBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  profileRole: {
    fontSize: 13,
    color: "#666",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 15,
    color: "#222",
  },
});

export default HomeHeader;