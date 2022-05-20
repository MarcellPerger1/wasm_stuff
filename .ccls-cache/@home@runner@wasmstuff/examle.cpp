#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;
int main() {
        val xhr = val::global("XMLHttpRequest").new_();
        xhr.call<void>("open", std::string("GET"), std::string("http://url"));
        return 0;
}