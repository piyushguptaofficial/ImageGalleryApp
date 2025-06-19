// utils/api.ts

// const API_KEY = "6f102c62f41998d151e5a1b48713cf13";
// utils/api.ts

export const getImages = async (page = 1, query = '') => {
  const method = query ? 'flickr.photos.search' : 'flickr.photos.getRecent';
  const textParam = query ? `&text=${query}` : '';

  const response = await fetch(
    `https://api.flickr.com/services/rest/?method=${method}&per_page=20&page=${page}&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s${textParam}`
  );

  const result = await response.json();
  return result.photos.photo
    .filter((item: any) => item.url_s) // only valid images
    .map((item: any) => ({
      id: item.id,
      title: item.title,
      url: item.url_s,
    }));
};



