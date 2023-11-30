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

export type PromptKey = keyof typeof promptOptions;
export type PromptValue = (typeof promptOptions)[PromptKey];
