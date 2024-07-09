const { defineConfig } = require("@vue/cli-service");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: process.env.VUE_APP_PORT || 9060,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_KEYCLOAK_HOST || 'http://localhost:8080',
        changeOrigin: true,
        onProxyReq: (proxyReq) => {
          proxyReq.removeHeader('x-forwarded-host');
          proxyReq.removeHeader('x-forwarded-proto');
          proxyReq.removeHeader('x-forwarded-port');
          proxyReq.removeHeader('x-forwarded-for');
        },
      },
      '/oauth': {
        target: process.env.VUE_APP_KEYCLOAK_HOST || 'http://localhost:8080',
        changeOrigin: true,
        onProxyReq: (proxyReq) => {
          proxyReq.removeHeader('x-forwarded-host');
          proxyReq.removeHeader('x-forwarded-proto');
          proxyReq.removeHeader('x-forwarded-port');
          proxyReq.removeHeader('x-forwarded-for');
        },
      },
    },
  },
  configureWebpack: {
    output: {
      libraryTarget: "system",
      filename: 'js/[name].js',
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
      require("unplugin-vue-components/webpack").default({
        resolvers: [ElementPlusResolver()],
      }),
      require("unplugin-auto-import/webpack").default({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    entry: {
      app: path.resolve(__dirname, 'src/main.ts'),
      blpvue: path.resolve(__dirname, 'src/views/RemoteApp.spa.ts'),
    },
    externals: [
      "@dlcm/cc-ui-utils-auth",
      "@dlcm/cc-ui-utils-store-user",
      "@dlcm/cc-ui-utils-store-locale",
      "@dlcm/cc-ui-utils-style"
    ]
  },
});
