import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import { ProductAPI } from "../api/ProductAPI";
import { getFavorites } from "../utils/asyncStorage";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = () => {

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
