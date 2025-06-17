// app/index.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import Card from '../components/card';
import { getImages } from '../utils/api';

type ImageItem = {
  id: number;
  title: string;
  url: string;
};

export default function Home() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadImages = async () => {
    try {
      // STEP 1: Try to get from storage
      const cachedData = await AsyncStorage.getItem('cachedImages');

      if (cachedData !== null) {
        setImages(JSON.parse(cachedData));
        console.log("Loaded from cache ✅");
      }

      // STEP 2: Fetch latest from API
      const freshImages = await getImages();
      setImages(freshImages);
      await AsyncStorage.setItem('cachedImages', JSON.stringify(freshImages));
      console.log("Fetched from API and cached 🔁");

    } catch (error) {
      console.error("Error loading images", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card item={item} />}
      />
    </View>
  );
}
