function factorial(n) {
  let factor = n;

  for (let f = n; f > 1; f--) {
    const newFactor = factor * (f - 1);
    factor = newFactor;
  }

  return factor;
}

// Jangan hapus kode di bawah ini!
export default factorial;
