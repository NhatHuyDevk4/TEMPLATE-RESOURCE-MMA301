"use client";

import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getFavorites, saveFavorites } from "../utils/asyncStorage";
import { showSuccessToast, showInfoRemoveToast } from "../components/Toast";

const DetailsScreen = ({ route }) => {
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const stored = await getFavorites();
      setIsFavorite(stored.some((j) => j.id === item.id));
    };
    checkFavorite();
  }, [item.id]);

  const toggleFavorite = async () => {
    let stored = await getFavorites();
    if (isFavorite) {
      stored = stored.filter((j) => j.id !== item.id);
      showInfoRemoveToast();
    } else {
      stored.push(item);
      showSuccessToast();
    }
    await saveFavorites(stored);
    setIsFavorite(!isFavorite);
  };

  const price = (item.cost + item.shipped) * 25000;
  const shippedDisplay =
    item.shipped === 0
      ? "Free Ship"
      : `${(item.shipped * 25000).toLocaleString()} VND`;

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Image source={{ uri: item.image }} style={styles.image} />
      <TouchableOpacity style={styles.heart} onPress={toggleFavorite}>
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={28}
          color={isFavorite ? "#ff3b5c" : "#d1d1d1"}
        />
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.name}>{item.jeName}</Text>

        <View style={styles.topMetaRow}>
          <Text style={styles.priceHighlight}>{price.toLocaleString()} VND</Text>
          <Text
            style={[
              styles.badge,
              item.shipped === 0 ? styles.badgeFree : styles.badgePaid,
            ]}
          >
            {shippedDisplay}
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Brand:</Text>
            <Text style={styles.detailValue}>{item.brand}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Material:</Text>
            <Text style={styles.detailValue}>{item.material}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Color:</Text>
            <Text style={styles.detailValue}>{item.color.join(", ")}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Has Stone:</Text>
            <Text style={styles.detailValue}>
              {item.stoneStyle ? "Yes" : "No"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Discount:</Text>
            <Text style={styles.detailValue}>
              {(item.percentOff * 100).toFixed(2)}%
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Shipped:</Text>
            <Text style={styles.detailValue}>{shippedDisplay}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Cost:</Text>
            <Text style={styles.detailValue}>
              {(item.cost * 25000).toLocaleString()} VND
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  heart: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  infoBox: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  topMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  priceHighlight: {
    fontSize: 20,
    fontWeight: "700",
    color: "#e53935",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
    fontSize: 12,
    fontWeight: "600",
  },
  badgeFree: {
    backgroundColor: "#e6f7ff",
    color: "#0077cc",
  },
  badgePaid: {
    backgroundColor: "#f5f5f5",
    color: "#555",
  },
  detailsContainer: {
    marginTop: 8,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailLabel: {
    flex: 1,
    fontSize: 14,
    color: "#666",
  },
  detailValue: {
    flex: 2,
    textAlign: "right",
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  addToCartButton: {
    backgroundColor: "#6200ee",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    marginTop: 10,
  },
});

export default DetailsScreen;
