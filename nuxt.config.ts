// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  app: {
    head: {
      title: "서로맑음 아젠다 | 서로맑음이 의견을 모으고, 소통합니다",
      htmlAttrs: {
        lang: "ko-KR"
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        {
          name: "title",
          property: "title",
          content: "서로맑음 아젠다 | 의견을 모으고, 소통합니다"
        },
        {
          name: "description",
          property: "description",
          content: "서로맑음 아젠다 | 의견을 모으고, 소통합니다"
        },
        {
          name: "keyword",
          content: ""
        },
        {
          name: "og:image",
          property: "og:image",
          content: "/og-image.png"
        },
        {
          name: "og:title",
          property: "og:title",
          content: "서로맑음 아젠다 | 의견을 모으고, 소통합니다"
        },
        {
          name: "og:description",
          property: "og:description",
          content: "서로맑음 아젠다 | 의견을 모으고, 소통합니다"
        },
        {
          name: "og:url",
          property: "og:url",
          content: process.env.VITE_AUTH_DOMAIN
        },
        {
          name: "og:type",
          property: "og:type",
          content: "매거진, 웹진"
        },
        {
          name: "og:site_name",
          property: "og:site_name",
          content: "서로맑음 아젠다 | 의견을 모으고, 소통합니다"
        },
        {
          name: "msapplication-TileImage",
          property: "msapplication-TileImage",
          content: "/ms-icon-144x144.png"
        },
        {
          name: "msapplication-TileColor",
          property: "msapplication-TileColor",
          content: "#001b7f"
        },
        {
          name: "theme-color",
          property: "theme-color",
          content: "#001b7f"
        },
        {
          name: "twitter:card",
          content: "/og-image.png"
        },
        {
          property: "twitter:domain",
          content: process.env.VITE_AUTH_DOMAIN
        },
        {
          property: "twitter:url",
          content: process.env.VITE_AUTH_DOMAIN
        },
        {
          name: "twitter:title",
          content: "서로맑음 아젠다 | 의견을 모으고, 소통합니다"
        },
        {
          name: "twitter:description",
          content: "서로맑음 아젠다 | 의견을 모으고, 소통합니다"
        },
        {
          name: "twitter:image",
          content: "/og-image.png"
        }
        // // 네이버 서치어드바이저
        // {
        //   name: "naver-site-verification",
        //   content: "e7e0d2f0aa7a7cf69ddf5a9467027f877e046828",
        // },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png"
        },
        {
          rel: "icon",
          sizes: "32x32",
          href: "/favicon-32x32.png"
        },
        {
          rel: "icon",
          sizes: "16x16",
          href: "/favicon-16x16.png"
        },
        // {
        //   rel: "manifest",
        //   href: "/site.webmanifest"
        // },
        {
          rel: "mask-icon",
          color: "#001b7f",
          href: "/safari-pinned-tab.svg"
        },
        // fonts
        {
          rel: "stylesheet",
          type: "text/css",
          href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css"
        }
        // {
        //   rel: "stylesheet",
        //   type: "text/css",
        //   href: "'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;0,900;1,400;1,700;1,900&display=swap'",
        // },
      ]
    }
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.VITE_BASE_URL || "http://localhost:3000",
      API_KEY: process.env.VITE_API_KEY,
      AUTH_DOMAIN: process.env.VITE_AUTH_DOMAIN,
      DATABASE_URL: process.env.VITE_DATABASE_URL,
      PROJECT_ID: process.env.VITE_PROJECT_ID,
      STORAGE_BUCKET: process.env.VITE_STORAGE_BUCKET,
      MESSAGING_SENDER_ID: process.env.VITE_MESSAGING_SENDER_ID,
      APP_ID: process.env.VITE_APP_ID,
      MEASUREMENT_ID: process.env.VITE_MEASUREMENT_ID || "",
      TOKEN_NAME: process.env.VITE_TOKEN_NAME
    }
  },
  // modules: [],
  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()]
  }
  // build

  // nitro: {

  // }
});
