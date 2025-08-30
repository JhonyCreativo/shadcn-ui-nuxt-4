import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const { apiBaseUrl } = useRuntimeConfig().public; // Access runtimeConfig
    if (!apiBaseUrl) {
      console.error('API Base URL is not defined in runtimeConfig');
      throw new Error('Missing API Base URL');
    }
    console.log('API Base URL:', apiBaseUrl);
    const api = axios.create({
      baseURL: apiBaseUrl,
      withCredentials: true,
    });
    return {
      provide: {
        api,
      },
    };
  }
});
