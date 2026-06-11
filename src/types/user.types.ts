export interface PublicProfile {
  id: number | string;
  name: string;
  imageUrl: string | null;
  gender: "m" | "f" | "other" | "";
  languagePreference: string;
}