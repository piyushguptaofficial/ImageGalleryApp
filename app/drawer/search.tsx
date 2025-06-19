// app/drawer/search.tsx

import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import Card from '../../components/Card';
import CategoryTabs from '../../components/CategoryTabs'; // Category tabs
import { getImages } from '../../utils/api';

type ImageItem = {
  id: number;
  title: string;
  url: string;
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Trending');
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleSearch = async (text = query) => {

    console.log("Searching for:", text); // checkpoint


    if (!text.trim()) return;

    setLoading(true);
    try {
      const results = await getImages(1, text);
      setImages(results);
      setSnackbarVisible(false);
    } catch (error) {
      console.error('Search Error:', error);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(category); // Load trending images by default
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Category Tabs */}
        <CategoryTabs
          selected={category}
          onSelect={(cat) => {
            setCategory(cat);
            setQuery(cat); // also update input field
            handleSearch(cat);
          }}
        />

        {/* Search Bar */}
        <TextInput
          placeholder="Search image..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() =>{
            console.log("direct TextInput search:", query);
          handleSearch(query);}}
          style={styles.input}
        />


        {/* <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={() => {
          console.log("🟢 Searching for (via onSubmit):", query); // ✅ Checkpoint
          handleSearch(query);
        
        
  }}
/> */}


        {/* Image List */}
        <FlatList
          data={images}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Card item={item} />}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          ListEmptyComponent={
            !loading
              ? <Text style={styles.noResult}>No results found 🧐</Text>
              : null
          }
          ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
        />

        {/* Snackbar */}
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={4000}
          action={{ label: 'Retry', onPress: () => handleSearch() }}
        >
          Failed to load images.
        </Snackbar>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 10,
  },
  noResult: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#777',
  },
});
