const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const dotenv = require("dotenv");
const dotenv_webpack = require("dotenv-webpack");

dotenv.config();

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "dlcm",
    projectName: "cc-blp-react",
    webpackConfigEnv,
    argv,
  });

  const config = merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      port: process.env.PORT || 9050,
      proxy: {
        "/api": {
          target: process.env.KEYCLOAK_HOST || "http://localhost:8080",
          changeOrigin: true,
        },
        "/oauth": {
          target: process.env.KEYCLOAK_HOST || "http://localhost:8080",
          changeOrigin: true,
        },
      },
    },
    plugins: [
      new dotenv_webpack({
        path: "./.env",
      }),
    ],
    entry: {
      "dlcm-cc-blp-react": defaultConfig.entry,
    },
    module: {
      rules: [
          {
              test: /\.scss$/,
              use: ["style-loader", "css-loader", "sass-loader"],
          },
      ],
  },
  });

  if (webpackConfigEnv.standalone) {
    const importMapPlugin = config.plugins.find(
      (plugin) => plugin.options && plugin.options.importMap
    );

    if (importMapPlugin) {
      const ccUiUtilsUrl = process.env.DLCM_CC_UI_UTILS;
      importMapPlugin.options.importMap.imports = {
        "single-spa":
          "https://cdn.jsdelivr.net/npm/single-spa@5.9.0/lib/system/single-spa.min.js",
        "@dlcm/cc-ui-utils-store-user": `${ccUiUtilsUrl}/store_user_.js`,
        "@dlcm/cc-ui-utils-auth": `${ccUiUtilsUrl}/auth.js`,
        "@dlcm/cc-ui-utils-style": `${ccUiUtilsUrl}/style.js`,
      };
    }
  }

  return config;
};
