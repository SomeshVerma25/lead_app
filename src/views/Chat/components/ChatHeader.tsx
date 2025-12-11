import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MessageCircle, Plus } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ChatHeaderProps {
  onNewChat?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onNewChat }) => {
    const inset = useSafeAreaInsets()
  return (
    <View style={[styles.container, {
        paddingTop: inset.top
    }]}>
      <View style={styles.left}>
        <MessageCircle size={24} color="#007AFF" />
        <Text style={styles.title}>Lead Assistant</Text>
      </View>

      <TouchableOpacity style={styles.newChatBtn} onPress={onNewChat}>
        <Plus size={22} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderColor: "#e2e2e2",
    elevation: 2,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#1e272e",
  },
  newChatBtn: {
    padding: 6,
    borderRadius: 50,
  },
});
