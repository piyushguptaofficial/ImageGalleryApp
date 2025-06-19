// components/HorizontalCategories.tsx
import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

const categories = ['Trending', '3D Images', 'Wallpapers', 'Texture', 'Mountains', 'Food', 'Landscapes'];

export default function HorizontalCategories({ selected, onSelect }: { selected: string; onSelect: (val: string) => void }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
      {categories.map((cat, index) => (
        <TouchableOpacity key={index} onPress={() => onSelect(cat)}>
          <Text
            style={{
              fontWeight: selected === cat ? 'bold' : 'normal',
              fontSize: 16,
              marginRight: 15,
              color: selected === cat ? 'black' : 'gray',
            }}
          >
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
