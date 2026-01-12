import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { BRANDS } from "../data/brands.data";

export default function ModelDetailsScreen({ route, navigation }) {
  const { modelId } = route.params;

  let foundModel = null;
  let foundBrand = null;

  BRANDS.forEach(b => {
    b.models.forEach(m => {
      if (m.id === modelId) {
        foundBrand = b;
        foundModel = m;
      }
    });
  });

  if (!foundModel) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Vehicle not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 16 }}>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ color: "#22c55e", marginBottom: 10 }}>
          ← Back
        </Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {foundBrand.brand} {foundModel.name}
      </Text>

      <View style={{
        marginTop: 20,
        backgroundColor: "#020617",
        padding: 16,
        borderRadius: 12
      }}>
        <Text>Type: {foundModel.type}</Text>
        <Text>Category: {foundModel.category}</Text>
        <Text>Engine: {foundModel.engine}</Text>
        <Text>Launch Year: {foundModel.launchYear}</Text>
        <Text>Era: {foundModel.era}</Text>
      </View>

      {/* FUTURE SPACE */}
      <View style={{ marginTop: 30, opacity: 0.6 }}>
        <Text>More specifications coming in app updates.</Text>
      </View>

    </ScrollView>
  );
}
