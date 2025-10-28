import AsyncStorage from "@react-native-async-storage/async-storage";

const PRODUCTS_KEY = "@products";

// Lấy danh sách sản phẩm đã lưu
export const loadProducts = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(PRODUCTS_KEY);
    if (!jsonValue) return [];
    return JSON.parse(jsonValue);
  } catch (error) {
    console.log("Lỗi khi tải sản phẩm:", error);
    return [];
  }
};

// Lưu danh sách sản phẩm
export const saveProducts = async (list) => {
  try {
    const jsonValue = JSON.stringify(list);
    await AsyncStorage.setItem(PRODUCTS_KEY, jsonValue);
  } catch (error) {
    console.log("Lỗi khi lưu sản phẩm:", error);
  }
};
