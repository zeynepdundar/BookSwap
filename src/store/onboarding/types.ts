import { Book } from "@/types/book.types";

export type OnboardingState = {
  name: string;
  birthdate: string | null;
  imageData: string | null;
  gender: "m" | "f" | "";
  languagePreference: string;

  wishlistBooks: Book[];
  libraryBooks: Book[];

  loading: boolean;
  error: string | null;
};