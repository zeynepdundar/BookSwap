export const IMAGE_FALLBACKS = {
  BOOK_COVER: { uri: "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg" },
  USER_AVATAR: require("@/assets/images/avatar.png"), 
} as const;

export const PROFILE_SCREEN_ICONS = {
  library: require("@/assets/images/icon/library-icon.png"),
  wishlist: require("@/assets/images/icon/wishlist-icon.png"),
  language: require("@/assets/images/icon/language-icon.png"),
  feedback: require("@/assets/images/icon/feedback-icon.png"),
  logout: require("@/assets/images/icon/logout-icon.png"),
} as const;

export const APP_ICONS = {
  app_logo: require("@/assets/images/app-icon-516x516.png"),
  swap: require("@/assets/images/icon/swap-icon.png"),
  swap_arrows: require("@/assets/images/icon/swap-arrows-icon.png")
} as const;

export const APP_IMAGES = {
  swap_book_text: require("@/assets/images/swap-book.png"),
  infiniteLibrary: require("@/assets/images/infinite-library.png"),

  // appLogo: require("@/assets/images/app-icon-516x516.png"),
  // swapBookText: require("@/assets/images/swap-book.png"),
  // onboardingHero: require("@/assets/images/onboarding-hero.png"),
  // emptyWishlist: require("@/assets/images/empty-wishlist.png"),
  // emptyLibrary: require("@/assets/images/empty-library.png"),
  // successIllustration: require("@/assets/images/success.png"),
} as const;