import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

import en from './locale/en_US.json';
import de from './locale/de_DE.json';
import fr from './locale/fr_FR.json';
import cz from './locale/cz_CZ.json';

let deviceLocale = Localization.locale;

/* expo-localization gives the result in a language-region format */
if (deviceLocale.indexOf("-") !== 0) {
    deviceLocale = deviceLocale.split("-")[0];
}
i18n.defaultLocale = 'en';
i18n.locale = 'de';
i18n.fallbacks = true;
i18n.translations = { en, de, fr, cz };

export default i18n;
