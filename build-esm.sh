emcc ./hw.cpp -o ./res-esm/hw.mjs \
  -sEXPORTED_FUNCTIONS=_main,_func2,_myFunction \
  -sEXPORTED_RUNTIME_METHODS=ccall,cwrap,registeredTypes \
  -sMODULARIZE \
  -lembind --bind \
  -gsource-map --source-map-base ./
./nix_unmangle_file.sh ./res-esm/hw.wasm.map