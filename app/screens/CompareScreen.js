import React from "react";
import { View, Text, ScrollView } from "react-native";
import CompareChart from "../components/CompareChart";

export default function CompareScreen({ route }) {
  const { vehicles } = route.params;

  return (
    <ScrollView style={{ padding: 16 }}>

      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Vehicle Comparison
      </Text>

      {/* BASIC INFO */}
      <View style={{ marginTop: 16 }}>
        {vehicles.map((v, i) => (
          <View key={i} style={{ marginBottom: 12 }}>
            <Text style={{ fontWeight: "bold" }}>
              {v.brand} {v.name}
            </Text>
            <Text>Seat height: {v.seatHeight} mm</Text>
            <Text>Kerb weight: {v.kerbWeight} kg</Text>
            <Text>Category: {v.category}</Text>
          </View>
        ))}
      </View>

      {/* VISUAL COMPARISON */}
      <CompareChart vehicles={vehicles} />

    </ScrollView>
  );
}
