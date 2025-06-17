// utils/api.ts
type ImageItem = {
  id: number;
  title: string;
  url: string;
};

export const getImages = async (): Promise<ImageItem[]> => {
  return [
    { id: 1, title: 'Beautiful Mountain', url: 'https://picsum.photos/id/1011/500/300' },
    { id: 2, title: 'Lake View', url: 'https://picsum.photos/id/1020/500/300' },
    { id: 3, title: 'Sunset Bliss', url: 'https://picsum.photos/id/1025/500/300' },
  ];
};