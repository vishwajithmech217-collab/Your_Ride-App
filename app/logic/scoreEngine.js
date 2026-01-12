import { calculateLegHeight } from "./legHeight";

export function calculateScore(vehicle, user) {
  let total = 0;
  let reasons = [];

  /* ---------- SEAT HEIGHT (0–4) ---------- */
  const legHeight = calculateLegHeight(
    user.height,
    user.legHeight
  );

  const seatDiff = Math.abs(vehicle.seatHeight - legHeight);

  let seatScore =
    seatDiff <= 5 ? 4 :
    seatDiff <= 15 ? 3 :
    seatDiff <= 30 ? 2 : 1;

  total += seatScore;
  reasons.push(`Seat fit: ${seatScore}/4`);

  /* ---------- USAGE MATCH (0–3) ---------- */
  const usagePreference =
    user.usage < 50
      ? vehicle.usage.city
      : vehicle.usage.highway;

  let usageScore =
    usagePreference >= 80 ? 3 :
    usagePreference >= 60 ? 2 : 1;

  total += usageScore;
  reasons.push(`Usage match: ${usageScore}/3`);

  /* ---------- FREQUENCY (0–2) ---------- */
  let frequencyScore =
    user.frequency < 40 ? 2 :
    user.frequency < 70 ? 1 : 0;

  total += frequencyScore;
  reasons.push(`Frequency fit: ${frequencyScore}/2`);

  /* ---------- WEIGHT COMPATIBILITY (0–1) ---------- */
  let weightScore = 1;

  if (
    (user.weight < 50 && vehicle.kerbWeight > 180) ||
    (user.weight > 90 && vehicle.kerbWeight < 120)
  ) {
    weightScore = 0;
    reasons.push("Weight mismatch");
  } else {
    reasons.push("Weight compatible");
  }

  total += weightScore;

  return {
    total,
    reasons
  };
}
