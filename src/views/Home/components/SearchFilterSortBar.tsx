import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Text
} from "react-native";
import { Search, Filter, Mic } from "lucide-react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  filterEnabled: boolean;
  onFilterToggle: (val: boolean) => void;
  onRightAction?: () => void;
}

const SearchFilterSortBar: React.FC<Props> = ({
  value,
  onChangeText,
  filterEnabled,
  onFilterToggle,
  onRightAction
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={16} color="#777" />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search"
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={onRightAction} style={styles.rightBtn}>
          <Mic size={16} color="#555" />
        </TouchableOpacity>
      </View>

      {/* Filter Switch With Text */}
      <View style={styles.filterContainer}>
        <Filter size={16} color={filterEnabled ? "#0a84ff" : "#666"} />
        <Text style={[styles.filterText, filterEnabled && { color: "#0a84ff" }]}>
          {"Match > 70%"}
        </Text>
        <Switch
          value={filterEnabled}
          onValueChange={onFilterToggle}
          thumbColor={filterEnabled ? "#fff" : "#f4f3f4"}
          trackColor={{ false: "#ccc", true: "#0a84ff" }}
        />
      </View>
    </View>
  );
};

export default SearchFilterSortBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 14,
    alignItems: "center",
    gap: 8,
    marginTop: 10
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 8,
    alignItems: "center",
    height: 40
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 6,
    color: "#333"
  },
  rightBtn: {
    padding: 4
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 40,
    gap: 6
  },
  filterText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500"
  }
});
