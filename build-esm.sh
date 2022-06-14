emcc ./hw.cpp -o ./res-esm/hw.mjs \
  -sEXPORTED_FUNCTIONS=_main,_func2,_myFunction \
  -sEXPORTED_RUNTIME_METHODS=ccall,cwrap,registeredTypes,GL \
  -sMODULARIZE -v \
  -lembind --bind \
  --post-js ./pre-js-file.js \
  -gsource-map --source-map-base ./
./nix_unmangle_file.sh ./res-esm/hw.wasm.map