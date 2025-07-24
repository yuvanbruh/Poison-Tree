export function averageVectors(vectors) {
  if (!vectors.length) return [];
  const dim = vectors[0].length;
  const sum = Array(dim).fill(0);

  for (let vec of vectors) {
    for (let i = 0; i < dim; i++) {
      sum[i] += vec[i];
    }
  }

  return sum.map((val) => val / vectors.length);
}

export function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return magA && magB ? dot / (magA * magB) : 0;
}

