import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import { ProductAPI } from "../api/ProductAPI";
import { getFavorites } from "../utils/asyncStorage";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const [jewelry, setJewelry] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const api = new ProductAPI();
      const data = await api.getAllJewelry();
      data.sort((a, b) => b.percentOff - a.percentOff);
      setJewelry(data);
      setFiltered(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isFocused) {
      const loadFavorites = async () => {
        const stored = await getFavorites();
        setFavorites(stored);
      };
      loadFavorites();
    }
  }, [isFocused]);

  useEffect(() => {
    let list = jewelry;
    if (selectedBrand) {
      list = list.filter((item) => item.brand === selectedBrand);
    }
    setFiltered(list);
  }, [selectedBrand, jewelry]);
  return (
    <SafeAreaView style={styles.container}>
      {/* <FlatList
        data={filtered}
        numColumns={2}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
         
        )}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#fff",
    letterSpacing: 2,
  },
  list: {
    paddingBottom: 100,
  },
});

export default HomeScreen;
