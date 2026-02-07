import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,

  name: "Book Swaps",
  slug: "book-swap-dev",
  owner: "zeyneppdndr",
  version: "1.0.6",
  orientation: "portrait",

  icon: "./assets/icon-516x516.png",

  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },

  updates: {
    fallbackToCacheTimeout: 0,
  },

  assetBundlePatterns: ["**/*"],

  plugins: [
    "expo-dev-client",
    "expo-localization",
    "@react-native-firebase/app",
    "@react-native-firebase/auth",
    [
      "expo-image-picker",
      {
        photosPermission: "custom photos permission",
        cameraPermission: "Allow $(PRODUCT_NAME) to open the camera",
      },
    ],
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

  ios: {
    buildNumber: "1.0.6",
    supportsTablet: true,
    bundleIdentifier: "com.harmony.bookswap",
    googleServicesFile:
      process.env.GOOGLE_SERVICE_INFO_PLIST ||
      "./keys/firebase/GoogleService-Info.plist",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },

  android: {
    versionCode: 4,
    package: "com.harmony.bookswap",
    googleServicesFile:
    process.env.GOOGLE_SERVICES_JSON ||
    "./keys/firebase/google-services.json",
    adaptiveIcon: {
      foregroundImage: "./assets/icon-516x516.png",
      backgroundColor: "#FFFFFF",
    },
  },

  extra: {
    API_BASE_URL: "http://3.124.218.218",
    API_PORT: "3050",
    eas: {
      projectId: "0f7c6eb0-95f1-4125-a4d2-a39eca6ba3c6",
    },
  },
});
