import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Search, SlidersHorizontal, Filter, Mic } from "lucide-react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSortPress: () => void;
  onFilterPress: () => void;
  onRightAction?: () => void;
}

const SearchFilterSortBar: React.FC<Props> = ({
  value,
  onChangeText,
  onSortPress,
  onFilterPress,
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

      <TouchableOpacity style={styles.btn} onPress={onSortPress}>
        <SlidersHorizontal size={18} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={onFilterPress}>
        <Filter size={18} color="#333" />
      </TouchableOpacity>
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
  btn: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center"
  }
});
