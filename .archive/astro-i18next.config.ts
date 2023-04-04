import type { AstroI18nextConfig } from "astro-i18next"
import { Language } from '../src/types/Language'

const config: AstroI18nextConfig = {
  defaultLocale: Language.EN,
  locales: Object.values(Language),
  namespaces: ["common", "schema"],
  defaultNamespace: "common",
  load: ["client"],
  i18nextServer: {
    backend: {
      loadPath: './public/locales/{{lng}}/{{ns}}.json',
    }
  },
  i18nextClient: {
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    defaultNS: 'common',
    fallbackNS: 'common',
  },
  resourcesBasePath: "/locales",
  showDefaultLocale: true,
}

export default config