export const customOptions = {
  realistic: "realistic:2.0",
  anime: "anime:2.0",
  photographic: "photographic:2.0",
  sketch: "sketch:2.0",
  painting: "painting:2.0",
  cartoon: "cartoon:2.0",
  vector: "vector:2.0",
  abstract: "abstract:2.0",
  artistic: "artistic:2.0",
};

export const customExamplePhotos = {
  realistic: "realistic-example.jpg",
  anime: "anime-example.jpg",
  photographic: "photographic-example.jpg",
  sketch: "sketch-example.jpg",
  painting: "painting-example.jpg",
  cartoon: "cartoon-example.jpg",
  vector: "vector-example.jpg",
  abstract: "abstract-example.jpg",
  artistic: "artistic-example.jpg",
};

export type CustomKey = keyof typeof customOptions;
export type CustomValue = (typeof customOptions)[CustomKey];
export interface Custom {
  key: CustomKey;
  value: CustomValue;
}
