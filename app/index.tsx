import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';

type ImageItem = {
  id: number;
  title: string;
  url: string;
};

export default function Home() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [query, setQuery] = useState('');

  const fetchImages = async (pageNum = 1, searchQuery = '') => {
    setLoading(true);
    try {
      const method = searchQuery ? 'flickr.photos.search' : 'flickr.photos.getRecent';
      const textParam = searchQuery ? `&text=${searchQuery}` : '';

      const response = await fetch(
        `https://api.flickr.com/services/rest/?method=${method}&per_page=20&page=${pageNum}&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s${textParam}`
      );

      const result = await response.json();
      const formatted = result.photos.photo
        .filter((item: any) => item.url_s)
        .map((item: any) => ({
          id: item.id,
          title: item.title,
          url: item.url_s,
        }));

      setImages(prev =>
        pageNum === 1 ? formatted : [...prev, ...formatted]
      );

      await AsyncStorage.setItem('cachedImages', JSON.stringify(formatted));
      setSnackbarVisible(false);
    } catch (error) {
      console.log('API error:', error);
      const cached = await AsyncStorage.getItem('cachedImages');
      if (cached) {
        setImages(JSON.parse(cached));
      }
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    setPage(1);
    fetchImages(1, query);
  };

  const loadMore = () => {
    if (!loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchImages(nextPage, query);
    }
  };

  useEffect(() => {
    fetchImages(page);
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Go to drawer search */}
      <Link href="/drawer/search" asChild>
        <TouchableOpacity>
          <Text style={{ fontSize: 18, color: 'blue', marginBottom: 10 }}>🔍 Go to Search</Text>
        </TouchableOpacity>
      </Link>

      {/* Local Search Bar */}
      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={handleSearch}
      />

      {/* Image Grid */}
      <FlatList
        data={images}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={({ item }) => <Card item={item} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      />

      {/* Snackbar on failure */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'RETRY',
          onPress: () => fetchImages(page, query),
        }}
        duration={4000}
      >
        Network error. Please try again.
      </Snackbar>
    </View>
  );
}
