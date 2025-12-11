import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Animated } from "react-native";
import { 
  Home, 
  MessageCircle, 
  Bell, 
  MapPin, 
  Scan 
} from "lucide-react-native";


const tabs = [
  { key: "Home", label: "Home", icon: Home },
  { key: "Chat", label: "Chat", icon: MessageCircle },
  { key: "Map", label: "Map", icon: MapPin },
  { key: "Scan", label: "Scan", icon: Scan },
  // { key: "Alerts", label: "Alerts", icon: Bell },
];

interface Props {
  state: any;
  descriptors: any;
  navigation: any;
}

const BottomBar: React.FC<Props> = ({ state, descriptors, navigation }) => {
  const animatedValue = new Animated.Value(0);

  const animate = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
      tension: 80,
    }).start(() =>
      Animated.spring(animatedValue, {
        toValue: 0,
        useNativeDriver: true,
      }).start()
    );
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {tabs.map((tab, index) => {
          const focused = state.index === index;
          const Icon = tab.icon;

          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              activeOpacity={0.7}
              onPress={() => {
                animate();
                navigation.navigate(tab.key);
              }}
            >
              <Animated.View
                style={[
                  focused ? styles.activeTab : styles.inactiveTab,
                  focused && { transform: [{ translateY }] },
                ]}
              >
                <Icon
                  size={24}
                  color={focused ? "#fff" : "#000"}
                  strokeWidth={focused ? 3 : 2}
                />
              </Animated.View>

              {/* Label */}
              <Text style={[styles.label, { color: focused ? "#000" : "#666" }]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#f5f5f5",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
    elevation: 10,
  },
  tab: {
    alignItems: "center",
    gap: 4,
  },
  inactiveTab: {
    padding: 10,
    borderRadius: 25,
  },
  activeTab: {
    padding: 12,
    backgroundColor: "#000",
    borderRadius: 28,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
  },
});
