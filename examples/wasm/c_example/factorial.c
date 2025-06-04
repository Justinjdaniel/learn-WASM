#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int factorial(int n) {
  if (n < 0) {
    return -1; // Or handle error appropriately
  }
  if (n == 0) {
    return 1;
  }
  int result = 1;
  for (int i = 1; i <= n; ++i) {
    result *= i;
  }
  return result;
}
