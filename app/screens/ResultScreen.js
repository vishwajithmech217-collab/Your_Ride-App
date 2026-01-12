import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import VehicleCard from "../components/VehicleCard";

export default function ResultScreen({ route, navigation }) {
  const { rankedResults } = route.params;
  const [compareList, setCompareList] = useState([]);

  const winner = rankedResults[0];

  function toggleCompare(vehicle) {
    setCompareList(prev =>
      prev.includes(vehicle)
        ? prev.filter(v => v !== vehicle)
        : [...prev, vehicle]
    );
  }

  return (
    <ScrollView style={{ padding: 16 }}>

      {/* 🏆 WINNER */}
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Best Match 🏆
      </Text>

      <VehicleCard
        vehicle={winner.vehicle}
        score={winner.score}
        highlight
        onPress={() =>
          navigation.navigate("ModelDetails", {
            vehicle: winner.vehicle
          })
        }
      />

      {/* OTHER OPTIONS */}
      <Text style={{ marginTop: 20, fontSize: 18 }}>
        Other Matches
      </Text>

      {rankedResults.slice(1).map((item, index) => (
        <VehicleCard
          key={index}
          vehicle={item.vehicle}
          score={item.score}
          selectable
          selected={compareList.includes(item.vehicle)}
          onSelect={() => toggleCompare(item.vehicle)}
          onPress={() =>
            navigation.navigate("ModelDetails", {
              vehicle: item.vehicle
            })
          }
        />
      ))}

      {/* COMPARE BUTTON */}
      {compareList.length >= 2 && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Compare", {
              vehicles: compareList
            })
          }
          style={{
            backgroundColor: "#22c55e",
            padding: 14,
            marginTop: 20,
            borderRadius: 10
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Compare Selected ({compareList.length})
          </Text>
        </TouchableOpacity>
      )}

    </ScrollView>
  );
}
