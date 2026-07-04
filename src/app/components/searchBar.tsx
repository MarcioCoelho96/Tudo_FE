import { Image } from "expo-image";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../styles/global";

// Define the types for the component's props
interface SearchBarProps {
  data: string[];
  placeholder?: string; // The '?' makes it optional
  onFilterResult: (filteredData: string[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  data,
  placeholder = "Insira aqui o serviço",
  onFilterResult,
}) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (text: string): void => {
    setQuery(text);

    // Filter the passed-in array string variable
    const filtered = data.filter((item: string) =>
      item.toLowerCase().includes(text.toLowerCase()),
    );

    // Explicitly pass the filtered array back up to the parent component
    onFilterResult(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={query}
        clearButtonMode="while-editing"
      />
      <TouchableOpacity
        style={styles.profileButton}
        activeOpacity={0.85}
        onPress={() => handleSearch(query)}
      >
        <Image
          source={require("../../../assets/images/searchIcon.png")}
          style={{ width: 28, height: 28 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    gap: 45,
  },
  input: {
    width: 213,
    height: 58,
    borderRadius: 50,
    paddingHorizontal: 15,
    backgroundColor: colors.gray,
  },
  profileButton: {
    width: 54,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: colors.main,
  },
});

export default SearchBar;
