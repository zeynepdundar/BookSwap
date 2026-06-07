export const IMAGE_FALLBACKS = {
  BOOK_COVER: "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg",
  USER_AVATAR: require("@/assets/images/avatar.png"), 
} as const;

export const PROFILE_SCREEN_ICONS = {
  library: require("@/assets/images/icon/library-icon.png"),
  wishlist: require("@/assets/images/icon/wishlist-icon.png"),
  language: require("@/assets/images/icon/language-icon.png"),
  feedback: require("@/assets/images/icon/feedback-icon.png"),
  logout: require("@/assets/images/icon/logout-icon.png"),
} as const;