// components/SearchBar.tsx
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type Props = {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
};

export default function SearchBar({ value, onChange, onSubmit }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search images..."
        value={value}
        onChangeText={onChange}
        onSubmitEditing={() => {
          console.log("onSubmitEditing triggered"); // Checkpoint
          onSubmit();
        }}
        returnKeyType="search"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 0.2,
    backgroundColor: '#f6f6f6',
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
