// utils/cache.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'cached_images';

export const cacheImages = async (images) => {
  try {
    const json = JSON.stringify(images);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    console.log('Error caching images:', error);
  }
};

export const getCachedImages = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json != null ? JSON.parse(json) : null;
  } catch (error) {
    console.log('Error fetching cached images:', error);
    return null;
  }
};
