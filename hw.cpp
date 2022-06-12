#include <iostream>

#include <emscripten.h>
#include <emscripten/val.h>
#include <webgl/webgl1.h>

#ifdef __cplusplus
#define NOMANGLE extern "C" {
#define NOMANGLE_END }
#else
#define NOMANGLE
#define NOMANGLE_END
#endif

NOMANGLE
using std::vector;
using emscripten::val;
using emscripten::internal::EM_VAL;

typedef unsigned long u32;

EMSCRIPTEN_KEEPALIVE void myFunction() {
  printf("MyFunction Called\n");
}

class World {
  val warr;
  public:
  u32 size[3];
  World(val warr) : warr(warr){
    size[0] = warr["length"].as<u32>();
    size[1] = warr[0]["length"].as<u32>();
    size[2] = warr[0][0]["length"].as<u32>();
  }
  val get_block(u32 x, u32 y, u32 z){
    return warr[x][y][z];
  }
};

// val getPos(size_t x, size_t y, size_t z){
//   return 
// }


EMSCRIPTEN_KEEPALIVE void func2(EM_VAL x) {
  printf("func2 Called\n");
  val xv = val::take_ownership(x);
  val::global("console").call<void>("log", xv);
  val::global("console").call<void>("log", xv["a"]);
  val::global("console").call<void>("log", xv["a"]["length"]);
  World w(xv["a"]);
  val::global("console").call<void>("log", w.get_block(1, 1, 0));
}


int main(int argc, char **argv) {
  std::cout << "Hello world, the code works!! 0x1F\n";
  return 0;
}


NOMANGLE_END
