// ✅ components/SearchBar.tsx
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
};

export default function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search images..."
        value={value}
        onChangeText={onChange}
        onSubmitEditing={() => onSubmit?.()} // ✅ important line
        style={styles.input}
        returnKeyType="search"
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
