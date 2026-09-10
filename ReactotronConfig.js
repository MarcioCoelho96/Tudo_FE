import Reactotron from "reactotron-react-native";

Reactotron.configure({ name: "My Expo App" })
  .useReactNative({
    asyncStorage: false, // set to true if using async-storage
    networking: {
      ignoreUrls: /localhost/, // ignore local noise if needed
    },
  })
  .connect();
