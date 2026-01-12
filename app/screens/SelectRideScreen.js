import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { BRANDS } from "../data/brands.data";

export default function SelectRideScreen({ navigation }) {

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [usage, setUsage] = useState(50);
  const [frequency, setFrequency] = useState(50);
  const [legHeight, setLegHeight] = useState("");
  const [results, setResults] = useState([]);

  function calcLegHeight(h, leg) {
    return leg ? Number(leg) : Math.round(h * 0.46);
  }

  function calculateScore(model, user) {
    let score = 0;

    const leg = calcLegHeight(user.height, user.legHeight);
    const seat = model.seatHeight;
    const diff = Math.abs(seat - leg);

    // Seat fit (4)
    score += diff <= 5 ? 4 : diff <= 15 ? 3 : diff <= 30 ? 2 : 1;

    // Usage (3)
    score += user.usage < 50
      ? model.city >= 70 ? 3 : 2
      : model.highway >= 70 ? 3 : 2;

    // Frequency (2)
    score += user.frequency < 40 ? 2 : user.frequency < 70 ? 1 : 0;

    // Weight safety (1)
    if (
      (user.weight < 50 && model.weight > 180) ||
      (user.weight > 90 && model.weight < 120)
    ) score += 0;
    else score += 1;

    return score;
  }

  function recommend() {
    if (!height || !weight) return;

    const user = {
      height: Number(height),
      weight: Number(weight),
      usage,
      frequency,
      legHeight
    };

    let allModels = [];

    BRANDS.forEach(b => {
      b.models.forEach(m => {
        if (m.type !== "Electric") {
          allModels.push({
            ...m,
            brand: b.brand
          });
        }
      });
    });

    const scored = allModels
      .map(m => ({
        model: m,
        score: calculateScore(m, user)
      }))
      .sort((a, b) => b.score - a.score);

    setResults(scored);
  }

  return (
    <ScrollView style={{ padding: 16 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Select Your Ride
      </Text>

      <TextInput
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        style={{ marginTop: 10 }}
      />

      <TextInput
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        style={{ marginTop: 10 }}
      />

      <Text style={{ marginTop: 20 }}>City ↔ Highway</Text>
      <Slider value={usage} onValueChange={setUsage} />

      <Text style={{ marginTop: 20 }}>Daily ↔ Occasional</Text>
      <Slider value={frequency} onValueChange={setFrequency} />

      <TextInput
        placeholder="Leg Height (optional)"
        keyboardType="numeric"
        value={legHeight}
        onChangeText={setLegHeight}
        style={{ marginTop: 10 }}
      />

      <TouchableOpacity
        style={{ marginTop: 20, backgroundColor: "#22c55e", padding: 14 }}
        onPress={recommend}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          Get Recommendation
        </Text>
      </TouchableOpacity>

      {/* RESULTS */}
      {results.map((r, i) => (
        <TouchableOpacity
          key={r.model.id}
          onPress={() =>
            navigation.navigate("ModelDetails", {
              modelId: r.model.id
            })
          }
          style={{
            marginTop: 14,
            padding: 14,
            borderWidth: i === 0 ? 2 : 0,
            borderColor: "#22c55e"
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            {r.brand} {r.model.name}
          </Text>
          <Text>Score: {r.score}/10</Text>
          {i === 0 && <Text>Best Match</Text>}
        </TouchableOpacity>
      ))}

    </ScrollView>
  );
}