import { calculateScore } from "../logic/scoreEngine";
import { filterByType } from "../logic/filters";

const filtered = filterByType(vehicles, selectedType);

const ranked = filtered
  .map(v => ({
    vehicle: v,
    score: calculateScore(v, user)
  }))
  .sort((a, b) => b.score.total - a.score.total);

// ranked[0] = BEST MATCH 🏆
