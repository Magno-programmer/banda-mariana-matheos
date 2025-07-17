/// <reference types="vite/client" />

declare module "*?format=avif;webp&as=srcset" {
  const value: {
    avif?: string;
    webp?: string;
    png?: string;
    jpg?: string;
    jpeg?: string;
  };
  export default value;
}

declare module "*?format=webp&as=srcset" {
  const value: {
    webp?: string;
    png?: string;
    jpg?: string;
    jpeg?: string;
  };
  export default value;
}
