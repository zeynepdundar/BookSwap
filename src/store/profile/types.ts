export interface UserProfile {
  id: number;
  name: string;
  birthdate: string | null;
  imageData: string | null;
  gender: "m" | "f" | "";
  languagePreference: "en" | "tr" | string;
}

export interface ProfileState {
  loading: boolean;
  error: null | Error;
  profile: UserProfile | null;
}