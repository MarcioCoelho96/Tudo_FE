import { Image } from "expo-image";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../styles/global";

// Define os tipos para as props do componente
interface SearchBarProps {
  data: string[];
  placeholder?: string;
  onFilterResult: (filteredData: string[]) => void;
  onFocus?: () => void; 
  onBlur?: () => void;  
}

const SearchBar: React.FC<SearchBarProps> = ({
  data,
  placeholder = "Insira aqui o serviço",
  onFilterResult,
  onFocus,
  onBlur,
}) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (text: string): void => {
    setQuery(text);

    // Filtra o array passado evitando erros de array nulo
    const filtered = (data || []).filter((item: string) =>
      item.toLowerCase().includes(text.toLowerCase())
    );

    onFilterResult(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888888"
        value={query}
        onChangeText={handleSearch} 
        onFocus={onFocus}           
        onBlur={onBlur}             
        clearButtonMode="while-editing"
      />
      <TouchableOpacity
        style={styles.profileButton}
        activeOpacity={0.85}
        onPress={() => handleSearch(query)}
      >
        <Image
          source={require("../../../assets/images/search.svg")}
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
    gap: 20,
  },

  input: {
    width: 250,
    height: 60,
    borderRadius: 50,
    paddingHorizontal: 20,
    backgroundColor: colors.gray,
  },

  profileButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: colors.main,
  },
});

export default SearchBar;