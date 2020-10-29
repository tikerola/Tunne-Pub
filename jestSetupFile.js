import mockAsyncStorage from "@react-native-community/async-storage/jest/async-storage-mock";

jest.setMock("@react-native-community/async-storage", {
  getItem: jest.fn(
    () =>
      new Promise((resolve, reject) => {
        resolve(JSON.stringify({ 123: { id: "123" } }));
      })
  ),
  setItem: jest.fn(
    () =>
      new Promise((resolve, reject) => {
        resolve();
      })
  ),
});
