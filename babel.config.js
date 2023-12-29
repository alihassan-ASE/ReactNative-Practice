module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          "root": ["./"],
          "alias": {
            "react-native-vector-icons": "react-native-vector-icons",
          }
        }
      ]
    ],
  };
};
