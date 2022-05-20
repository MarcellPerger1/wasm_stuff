#include <emscripten.h>
#include <emscripten/val.h>

using namespace emscripten;
int main() {
  val xhr = val::global("XMLHttpRequest").new_();
  xhr.call<void>("open", std::string("GET"), std::string("./example.cpp"));
  return 0;
}
