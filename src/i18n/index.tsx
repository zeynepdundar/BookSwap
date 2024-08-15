import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from "./en.json";
import tr from "./tr.json";

const i18n = new I18n({
  en,
  tr,
});

i18n.locale = Localization.locale;
i18n.enableFallback = true;

export default i18n;
