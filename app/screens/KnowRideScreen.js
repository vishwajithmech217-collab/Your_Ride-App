import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { BRANDS } from "../data/brands.data";

export default function KnowRideScreen({ navigation }) {
  const [brand, setBrand] = useState(null);
  const [type, setType] = useState(null);
  const [model, setModel] = useState(null);

  const [timelineValue, setTimelineValue] = useState(50);
  const [timelineLocked, setTimelineLocked] = useState(false);

  const ERA_POSITION = {
    classic: 15,
    modern: 50,
    bs6: 85
  };

  /* ---------- DERIVED DATA ---------- */
  const brandObj = BRANDS.find(b => b.brand === brand);

  const types = brandObj
    ? [...new Set(brandObj.models.map(m => m.type))]
    : [];

  const models =
    brandObj && type
      ? brandObj.models.filter(m => m.type === type)
      : [];

  /* ---------- HANDLERS ---------- */
  function onBrandSelect(b) {
    setBrand(b);
    setType(null);
    setModel(null);
    setTimelineLocked(false);
    setTimelineValue(50);
  }

  function onModelSelect(m) {
    setModel(m);
    setTimelineLocked(true);
    setTimelineValue(ERA_POSITION[m.era]);
  }

  return (
    <ScrollView style={{ padding: 16 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Know Your Ride
      </Text>

      {/* ===== BRAND ===== */}
      <Text style={{ marginTop: 20 }}>Select Brand</Text>

      {BRANDS.map(b => (
        <TouchableOpacity
          key={b.brand}
          onPress={() => onBrandSelect(b.brand)}
          style={{
            padding: 12,
            marginTop: 8,
            borderRadius: 8,
            backgroundColor:
              brand === b.brand ? "#22c55e" : "#1e293b"
          }}
        >
          <Text style={{ color: "#fff" }}>{b.brand}</Text>
        </TouchableOpacity>
      ))}

      {/* ===== TIMELINE ===== */}
      {brand && (
        <>
          <Text style={{ marginTop: 24 }}>
            Evolution Timeline
          </Text>

          <Slider
            minimumValue={0}
            maximumValue={100}
            value={timelineValue}
            disabled={timelineLocked}
            onValueChange={setTimelineValue}
            minimumTrackTintColor="#22c55e"
            maximumTrackTintColor="#334155"
          />

          <View style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}>
            <Text>Classic</Text>
            <Text>Modern</Text>
            <Text>BS6</Text>
          </View>
        </>
      )}

      {/* ===== TYPE ===== */}
      {brand && (
        <>
          <Text style={{ marginTop: 24 }}>Select Type</Text>

          {types.map(t => (
            <TouchableOpacity
              key={t}
              onPress={() => {
                setType(t);
                setModel(null);
              }}
              style={{
                padding: 12,
                marginTop: 8,
                borderRadius: 8,
                backgroundColor:
                  type === t ? "#22c55e" : "#1e293b"
              }}
            >
              <Text style={{ color: "#fff" }}>{t}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      {/* ===== MODEL ===== */}
      {type && (
        <>
          <Text style={{ marginTop: 24 }}>Select Model</Text>

          {models.map(m => (
            <TouchableOpacity
              key={m.id}
              onPress={() => onModelSelect(m)}
              style={{
                padding: 12,
                marginTop: 8,
                borderRadius: 8,
                backgroundColor:
                  model?.id === m.id ? "#22c55e" : "#1e293b"
              }}
            >
              <Text style={{ color: "#fff" }}>{m.name}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      {/* ===== PREVIEW ===== */}
      {model && (
        <View style={{
          backgroundColor: "#020617",
          padding: 16,
          borderRadius: 12,
          marginTop: 30
        }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {brand} · {model.name}
          </Text>

          <Text>Category: {model.category}</Text>
          <Text>Engine: {model.engine}</Text>
          <Text>Launched: {model.launchYear}</Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ModelDetails", {
                modelId: model.id
              })
            }
            style={{
              marginTop: 14,
              backgroundColor: "#22c55e",
              padding: 12,
              borderRadius: 8
            }}
          >
            <Text style={{ textAlign: "center", color: "#022c22" }}>
              Know More →
            </Text>
          </TouchableOpacity>
        </View>
      )}

    </ScrollView>
  );
}
