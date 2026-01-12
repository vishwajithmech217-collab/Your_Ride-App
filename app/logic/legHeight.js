export function calculateLegHeight(height, manualLegHeight = null) {
  if (manualLegHeight && manualLegHeight > 0) {
    return manualLegHeight;
  }
  // Avg human leg ≈ 46% of height
  return Math.round(height * 0.46);
}
