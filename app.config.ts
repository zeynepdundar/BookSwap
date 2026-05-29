import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Book Swaps",
  slug: "book-swap",
  ios: {
    buildNumber: config.ios?.buildNumber,
    supportsTablet: true,
    googleServicesFile:
      process.env.GOOGLE_SERVICE_INFO_PLIST ||
      "./keys/firebase/GoogleService-Info.plist",
    bundleIdentifier: "com.harmony.bookswap",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    versionCode: config.android?.versionCode,
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
