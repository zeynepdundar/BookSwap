import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from "./locales/en.json";
import tr from "./locales/tr.json";

const i18n = new I18n({
  en,
  tr,
});


const locale =
  Localization.getLocales()?.[0]?.languageCode ?? "en";

i18n.locale = locale;

export default i18n;