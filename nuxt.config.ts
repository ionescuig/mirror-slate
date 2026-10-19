export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2026-10-17',
  devServer: {
    host: '0.0.0.0',
    port: 4173,
  },
  ui: {
    fonts: false,
  },
  icon: {
    serverBundle: {
      collections: ['lucide'],
    },
    clientBundle: {
      scan: true,
    },
    fallbackToApi: false,
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  app: {
    head: {
      title: 'mirror-slate',
      htmlAttrs: { lang: 'en-GB' },
    },
  },
  routeRules: {
    '/': { headers: { 'cache-control': 'no-store' } },
    '/api/**': { headers: { 'cache-control': 'no-store' } },
  },
})
