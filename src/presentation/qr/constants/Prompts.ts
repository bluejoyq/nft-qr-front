export const promptOptions = {
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

export const promptExamplePhotos = {
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

export type PromptKey = keyof typeof promptOptions;
export type PromptValue = (typeof promptOptions)[PromptKey];
