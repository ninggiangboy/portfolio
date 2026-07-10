import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.VIETNAMESE],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-all",
  },
};

export default config;
