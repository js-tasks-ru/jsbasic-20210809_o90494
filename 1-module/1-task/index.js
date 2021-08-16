function factorial(n) {
  let a = 1;
  while(n > 1) {
    a *= n--;
  }
  return a;
}
