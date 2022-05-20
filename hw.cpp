#include <iostream>

#include <emscripten.h>
#include <emscripten/val.h>

#ifdef __cplusplus
#define NOMANGLE extern "C" {
#define NOMANGLE_END }
#else
#define NOMANGLE
#define NOMANGLE_END
#endif

using emscripten::val;
using emscripten::internal::EM_VAL;

NOMANGLE EMSCRIPTEN_KEEPALIVE void myFunction() {
  printf("MyFunction Called\n");
}
NOMANGLE_END

NOMANGLE EMSCRIPTEN_KEEPALIVE void func2(EM_VAL x) {
  printf("func2 Called\n");
  val xv = val::take_ownership(x);
  val::global("console").call<void>("log", xv);
}
NOMANGLE_END

int main(int argc, char **argv) {
  std::cout << "Hello world, the code works!! 0x17\n";
  return 0;
}
