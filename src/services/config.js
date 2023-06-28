const devUrls = {
  dev: `${import.meta.env.VITE_DEV_API_URL}`,
  prod: `${import.meta.env.VITE_PROD_API_URL}`,
};

const baseUrls = {
  development: devUrls.dev,
  production: devUrls.prod,
};

const MODE = `${import.meta.env.MODE}`;

const config = {
  baseUrl: baseUrls[MODE],
};

export default config;
