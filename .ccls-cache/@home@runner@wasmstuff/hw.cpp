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

NOMANGLE
using emscripten::val;
using emscripten::internal::EM_VAL;

EMSCRIPTEN_KEEPALIVE void myFunction() {
  printf("MyFunction Called\n");
}

class World {
  val warr;
  public:
  World(val warr) : warr(warr){}
  template<class T> World(val warr) : warr(warr){
    
  } 
  val get_block(size_t x, size_t y, size_t z){
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
}


int main(int argc, char **argv) {
  std::cout << "Hello world, the code works!! 0x1A\n";
  return 0;
}


NOMANGLE_END
