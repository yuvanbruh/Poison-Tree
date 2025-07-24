export function blendVectors(vecA, vecB, alpha = 0.7) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return vecA || vecB || [];

  return vecA.map((val, idx) => val * alpha + vecB[idx] * (1 - alpha));
}
