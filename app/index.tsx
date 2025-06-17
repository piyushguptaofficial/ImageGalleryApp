import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import Card from '../components/card';
import { getImages } from '../utils/api';

type ImageItem = {
  id: number;
  title: string;
  url: string;
};

export default function Home() {
  const [images, setImages] = useState<ImageItem[]>([]); // Loadind state

  useEffect(() => {
    const fetchImages = async () => {
      const data = await getImages(); // Fetching data from API
      setImages(data); // Update the state with the fetched data
    };
    fetchImages(); // Call the function to fetch data
  }, []);

  return (
    // Container for the list
    <View style={{ flex: 1, padding: 10 }}>  
      <FlatList 
        data={images}
        keyExtractor={(item) => item.id.toString()} // Extracting the id from each item
        renderItem={({ item }) => <Card item={item} />} // Rendering each item as a Card component
      />
    </View>
  );
}
