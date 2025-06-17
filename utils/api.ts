export const getImages = async () => {
  try {
    const res = await fetch('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s');
    const data = await res.json();
    return data.photos.photo.map((item: any) => ({
      id: item.id,
      title: item.title,
      url: item.url_s,
    }));
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
};
