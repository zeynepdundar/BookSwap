import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Book Swaps",
  slug: "book-swap",
  ios: {
    buildNumber: "1.0.6",
    supportsTablet: true,
    googleServicesFile:
      process.env.GOOGLE_SERVICE_INFO_PLIST ||
      "./keys/firebase/GoogleService-Info.plist",
    bundleIdentifier: "com.harmony.bookswap",
  },
  android: {
    versionCode: 4,
    googleServicesFile:
      process.env.GOOGLE_SERVICES_JSON ||
      "./keys/firebase/google-services.json",
    adaptiveIcon: {
      foregroundImage: "./assets/icon-516x516.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.harmony.bookswap",
  }
});
