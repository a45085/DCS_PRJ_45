module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["react-native-reanimated/plugin"],
      [
        // loads this module into the bundler
        // because we need to bundle the environment variables into our app (when it gets built, the environment variables are there to use)
        "module:react-native-dotenv",
        {
          moduleName: "@env", // define o nome de import
          path: ".env", // define o caminho
        },
      ],
    ],
  };
};
