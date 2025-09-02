function fibonacci(n) {
  const fibonac = [];

  for (let f = 0; f <= n; f++) {
    if (f <= 1) {
      fibonac.push(f);
      continue;
    }

    const fiboNumber = fibonac[f - 1] + fibonac[f - 2];
    fibonac.push(fiboNumber);
  }

  return fibonac;
}

// Jangan hapus kode di bawah ini!
export default fibonacci;
