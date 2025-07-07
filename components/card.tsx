// components/Card.tsx
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text } from 'react-native';

interface Props {
  item: {
    id: string;
    title: string;
    url: string;
  };
}

export default function Card({ item }: Props) {
  return (
    <Pressable style={({ pressed }) => [
      styles.card,
      pressed && Platform.OS === 'web' && styles.cardPressed,
    ]}>
      <Image
        source={{ uri: item.url }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      <Text numberOfLines={1} style={styles.title}>
        {item.title || 'Untitled'}
      </Text>
    </Pressable>
  );
}

const [scale] = useState(new Animated.Value(1));

// const handlePressIn = () => {
//   Animated.spring(scale, {
//     toValue: 0.95,
//     useNativeDriver: true,
//   }).start();
// }

// const handlePressOut = () => {
//   Animated.spring(scale, {
//     toValue: 1,
//     useNativeDriver: true,
//     }).start();
//   }

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    transitionDuration: '150ms',
    cursor: 'pointer',
  },
  cardPressed: {
    transform: [{ scale: 1.03 }],
  },


  image: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    padding: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    fontFamily: 'Open Sans',
  },
});
