# Tài liệu dự án (Tiếng Việt)

Tài liệu này giúp bạn (và học viên) hiểu nhanh cấu trúc dự án, các thư viện đã dùng, cách chạy ứng dụng, cũng như cách thêm màn hình, điều hướng, gọi API và lưu dữ liệu cục bộ.

---

## 1) Tổng quan công nghệ
- **Expo SDK 52**: khởi tạo, build và chạy app React Native nhanh.
- **React Navigation v7**: điều hướng Stack và Bottom Tabs.
- **react-native-gesture-handler**, **react-native-reanimated**, **react-native-screens**, **react-native-safe-area-context**, **@react-native-masked-view/masked-view**: các phụ trợ bắt buộc cho React Navigation.
- **Axios**: gọi API HTTP.
- **AsyncStorage (@react-native-async-storage/async-storage)**: lưu trữ đơn giản (yêu thích, token…).
- **react-native-toast-message**: hiển thị toast.

Phiên bản chính (xem `package.json`):
- `expo ~52.0.40`, `react 18.3.1`, `react-native 0.76.7`
- `@react-navigation/native 7.x`, `@react-navigation/stack 7.x`, `@react-navigation/bottom-tabs 7.x`

---

## 2) Cấu trúc thư mục
```
Solution/
├─ App.js                 // Root app, bọc GestureHandlerRootView + SafeAreaProvider
├─ index.js               // registerRootComponent, import gesture-handler
├─ babel.config.js        // Babel + reanimated plugin
├─ app.json               // cấu hình Expo
├─ src/
│  ├─ api/
│  │  ├─ APIClient.js     // tạo axios instance
│  │  └─ ProductAPI.js    // các hàm gọi API sản phẩm
│  ├─ components/
│  │  ├─ CategoryFilter.js
│  │  ├─ HeaderComponent.js
│  │  ├─ ProductCard.js
│  │  └─ Toast.js         // cấu hình + helpers toast
│  ├─ navigation/
│  │  └─ AppNavigation.js // NavigationContainer, Stack + Tabs
│  ├─ screen/
│  │  ├─ HomeScreen.js    // danh sách sản phẩm, điều hướng sang Details
│  │  ├─ DetailsScreen.js // chi tiết sản phẩm, yêu thích
│  │  ├─ FavouriteScreen.js (có thể không dùng)
│  │  └─ PremiereScreen.js (có thể không dùng)
│  └─ utils/
│     └─ asyncStorage.js  // helpers lưu/đọc danh sách sản phẩm
└─ assets/                // icon, splash, hình ảnh
```

---

## 3) Cách chạy dự án
1. Cài dependencies (đúng với Expo SDK 52):
```bash
npx expo install react-native-gesture-handler react-native-reanimated @react-native-masked-view/masked-view react-native-safe-area-context react-native-screens
npm install
```
2. Khởi động dev server (reset cache để an toàn):
```bash
npx expo start -c
```
3. Mở trên thiết bị/giả lập:
- Android: nhấn "a" trong terminal hoặc mở Expo Go và scan QR.
- iOS: nhấn "i" (macOS) hoặc mở Expo Go trên iPhone.

Lưu ý quan trọng:
- `index.js` phải `import 'react-native-gesture-handler';` trước mọi import khác.
- Có `babel.config.js` với plugin `react-native-reanimated/plugin` (đặt cuối danh sách plugins).
- `App.js` nên bọc bằng `GestureHandlerRootView` và `SafeAreaProvider`.

---

## 4) Điều hướng (Navigation)
Tập trung tại `src/navigation/AppNavigation.js`:
- Dùng `NavigationContainer` bọc toàn bộ.
- `Stack.Navigator` chứa các màn: `Main` (Tabs), `Details`.
- `MainTabs` là `createBottomTabNavigator()` với tab Home.

Ví dụ thêm một Tab mới (Favorites):
```jsx
// src/navigation/AppNavigation.js
<Tab.Screen
  name="Favorite"
  component={FavoriteScreen}
  options={{
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="heart" color={color} size={size} />
    ),
    title: 'Yêu thích'
  }}
/>
```

Điều hướng từ Home sang Details:
```jsx
// HomeScreen.js
navigation.navigate('Details', { item });
```
Nhận params ở Details:
```jsx
const DetailsScreen = ({ route }) => {
  const { item } = route.params;
  // dùng item
};
```

Tuỳ biến màu tab:
- Toàn cục: `screenOptions={{ tabBarActiveTintColor: 'blue', tabBarInactiveTintColor: 'gray' }}`
- Riêng từng tab: `options={{ tabBarActiveTintColor: 'dodgerblue' }}`

---

## 5) Gọi API với Axios
- Cấu hình axios instance ở `src/api/APIClient.js`.
- Tạo các hàm domain ở `src/api/ProductAPI.js`.

Ví dụ (giả định):
```js
// src/api/ProductAPI.js
import api from './APIClient';

export const fetchProducts = async () => {
  const res = await api.get('/products');
  return res.data;
};
```
Dùng trong `HomeScreen.js` (ví dụ):
```js
useEffect(() => {
  const load = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };
  load();
}, []);
```

---

## 6) Lưu dữ liệu với AsyncStorage (Products)
- Helper mới: `src/utils/asyncStorage.js` có `loadProducts`, `saveProducts` để đọc/ghi danh sách sản phẩm.

Ví dụ đọc và hiển thị danh sách sản phẩm đã lưu:
```js
import { loadProducts } from '../utils/asyncStorage';

useEffect(() => {
  const load = async () => {
    const stored = await loadProducts();
    setProducts(stored);
  };
  load();
}, []);
```

Ví dụ lưu (ghi đè danh sách hiện tại):
```js
import { saveProducts } from '../utils/asyncStorage';

const onSave = async () => {
  await saveProducts(products);
};
```

---

## 7) Thêm màn hình mới (tối giản)
1. Tạo file màn hình:
```bash
src/screen/ProfileScreen.js
```
```jsx
import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile</Text>
    </View>
  );
}
```
2. Gắn vào Tabs:
```jsx
import ProfileScreen from '../screen/ProfileScreen';

<Tab.Screen name="Profile" component={ProfileScreen} />
```
3. Hoặc gắn vào Stack:
```jsx
<Stack.Screen name="Profile" component={ProfileScreen} />
```

---

## 8) Toast thông báo
- Thành phần `src/components/Toast.js` cấu hình provider và các helper: `showSuccessToast`, `showInfoRemoveToast`.
- Đảm bảo đặt `<Toast />` trong gốc điều hướng (đã có trong `AppNavigation.js`).

---

## 9) Mẹo và lỗi thường gặp
- Lỗi "Unable to resolve react-native-gesture-handler": cài lib và đảm bảo `import 'react-native-gesture-handler';` ở `index.js`.
- Reanimated: thêm plugin vào `babel.config.js`. Sau khi cài, khởi động lại với `npx expo start -c`.
- UI nhảy phần tai thỏ: bọc app bằng `SafeAreaProvider` và dùng `useSafeAreaInsets` nếu cần.
- Icon: dùng `@expo/vector-icons` (`Ionicons`).

---

## 10) Kịch bản demo giảng dạy (gợi ý nhanh)
- Giới thiệu cấu trúc thư mục, vai trò từng thư mục.
- Chạy app, xem Home, mở Details.
- Thêm một Tab mới (Profile) và điều hướng thử.
- Gọi API mẫu (giả lập hoặc endpoint có sẵn), hiển thị danh sách.
- Thêm nút Favorite, lưu vào AsyncStorage, hiện Toast.
- Tinh chỉnh màu tab, tiêu đề Stack.

---

## 11) Lệnh nhanh
```bash
# cài phụ thuộc chính của Navigation (SDK 52)
npx expo install react-native-gesture-handler react-native-reanimated @react-native-masked-view/masked-view react-native-safe-area-context react-native-screens

# chạy dev server reset cache
npx expo start -c
```


