import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Book Swaps",
  slug: "book-swap",
  version: "1.0.6",
  orientation: "portrait",
  icon: "./assets/icon-516x516.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    [
      "expo-image-picker",
      {
        photosPermission: "custom photos permission",
        cameraPermission: "Allow $(PRODUCT_NAME) to open the camera",
      },
    ],
    "expo-localization",
    "@react-native-firebase/app",
    "@react-native-firebase/auth",
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
      },
    ],
    [
      "expo-barcode-scanner",
      {
        cameraPermission: "Allow $(PRODUCT_NAME) to access camera.",
      },
    ],
  ],
  extra: {
    eas: {
      projectId: "608511f3-d47b-4ab5-a6a6-e922ab51d524",
    },
  },
  ios: {
    buildNumber: "1.0.6",
    supportsTablet: true,
    googleServicesFile: process.env.GOOGLE_SERVICE_INFO_PLIST || "./keys/firebase/GoogleService-Info.plist",
    bundleIdentifier: "com.harmony.bookswap",
  },
  android: {
    versionCode: 4,
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON || "./keys/firebase/google-services.json",
    adaptiveIcon: {
      foregroundImage: "./assets/icon-516x516.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.harmony.bookswap",
  },
});
