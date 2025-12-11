import React from "react";
import { View, Text, Modal, ActivityIndicator, StyleSheet } from "react-native";

const AnalyzingModal = ({ visible }: { visible: boolean }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.box}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.text}>Analyzing image...</Text>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: 180,
    alignItems: "center",
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AnalyzingModal;